import cors from 'cors'
import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import jwt from 'jsonwebtoken'
import { fileURLToPath } from 'node:url'

const app = express()
const port = globalThis.process?.env?.PORT || 4001
const jwtSecret = globalThis.process?.env?.JWT_SECRET || 'manish-interiors-dev-secret'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dbPath = path.join(__dirname, 'data', 'db.json')

const users = [
  { id: 'U-1', name: 'Admin', email: 'admin@manishinteriors.in', password: 'admin123', role: 'admin' },
  { id: 'U-2', name: 'Client Demo', email: 'client@manishinteriors.in', password: 'client123', role: 'client' },
]

app.use(cors())
app.use(express.json())

function readDb() {
  const content = fs.readFileSync(dbPath, 'utf-8')
  return JSON.parse(content)
}

function writeDb(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8')
}

function makeId(prefix, items) {
  const next = 1001 + items.length
  return `${prefix}-${next}`
}

function authRequired(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''

  if (!token) {
    return res.status(401).json({ message: 'Missing token' })
  }

  try {
    const payload = jwt.verify(token, jwtSecret)
    req.user = payload
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

function adminRequired(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' })
  }
  next()
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'manish-interiors-api' })
})

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, jwtSecret, {
    expiresIn: '8h',
  })

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  })
})

app.get('/api/auth/me', authRequired, (req, res) => {
  res.json({ user: req.user })
})

app.post('/api/leads', (req, res) => {
  const db = readDb()
  const payload = req.body

  const lead = {
    id: makeId('LD', db.leads),
    name: payload.name,
    phone: payload.phone,
    location: payload.location,
    propertyType: payload.propertyType,
    budget: payload.budget,
    timeline: payload.timeline,
    message: payload.message || '',
    source: payload.source || 'Website Form',
    status: 'New',
    createdAt: new Date().toISOString().slice(0, 10),
  }

  db.leads.unshift(lead)
  writeDb(db)
  res.status(201).json(lead)
})

app.get('/api/leads', authRequired, adminRequired, (_req, res) => {
  const db = readDb()
  res.json(db.leads)
})

app.patch('/api/leads/:id/status', authRequired, adminRequired, (req, res) => {
  const db = readDb()
  const index = db.leads.findIndex((lead) => lead.id === req.params.id)

  if (index < 0) {
    return res.status(404).json({ message: 'Lead not found' })
  }

  db.leads[index] = {
    ...db.leads[index],
    status: req.body.status || db.leads[index].status,
  }

  writeDb(db)
  res.json(db.leads[index])
})

app.get('/api/client/projects', authRequired, (req, res) => {
  const db = readDb()

  if (req.user.role === 'admin') {
    return res.json(db.projects)
  }

  const ownedProjects = db.projects.filter((project) => project.clientEmail === req.user.email)
  return res.json(ownedProjects)
})

app.get('/api/projects', (_req, res) => {
  const db = readDb()
  res.json(db.projects)
})

app.post('/api/projects', authRequired, adminRequired, (req, res) => {
  const db = readDb()
  const item = {
    id: makeId('PRJ', db.projects),
    title: req.body.title,
    location: req.body.location,
    style: req.body.style,
    budget: req.body.budget,
    duration: req.body.duration,
    clientEmail: req.body.clientEmail || 'client@manishinteriors.in',
    status: req.body.status || 'Planning',
    progress: Number(req.body.progress || 10),
    gallery: req.body.gallery || [],
    milestones: req.body.milestones || [
      { name: 'Discovery Call', done: true },
      { name: 'Site Visit', done: true },
      { name: '3D Design Approval', done: false },
      { name: 'Execution', done: false },
      { name: 'Handover', done: false },
    ],
    createdAt: new Date().toISOString().slice(0, 10),
  }
  db.projects.unshift(item)
  writeDb(db)
  res.status(201).json(item)
})

app.patch('/api/projects/:id/progress', authRequired, adminRequired, (req, res) => {
  const db = readDb()
  const index = db.projects.findIndex((project) => project.id === req.params.id)

  if (index < 0) {
    return res.status(404).json({ message: 'Project not found' })
  }

  db.projects[index] = {
    ...db.projects[index],
    status: req.body.status || db.projects[index].status,
    progress:
      typeof req.body.progress === 'number' ? req.body.progress : db.projects[index].progress,
  }
  writeDb(db)
  return res.json(db.projects[index])
})

app.post('/api/projects/:id/gallery', authRequired, adminRequired, (req, res) => {
  const db = readDb()
  const index = db.projects.findIndex((project) => project.id === req.params.id)

  if (index < 0) {
    return res.status(404).json({ message: 'Project not found' })
  }

  const image = {
    id: `IMG-${Date.now()}`,
    stage: req.body.stage === 'after' ? 'after' : 'before',
    imageUrl: req.body.imageUrl,
    caption: req.body.caption || '',
  }

  const gallery = Array.isArray(db.projects[index].gallery) ? db.projects[index].gallery : []
  db.projects[index] = {
    ...db.projects[index],
    gallery: [image, ...gallery],
  }

  writeDb(db)
  return res.status(201).json(image)
})

app.delete('/api/projects/:id/gallery/:imageId', authRequired, adminRequired, (req, res) => {
  const db = readDb()
  const index = db.projects.findIndex((project) => project.id === req.params.id)

  if (index < 0) {
    return res.status(404).json({ message: 'Project not found' })
  }

  const gallery = Array.isArray(db.projects[index].gallery) ? db.projects[index].gallery : []
  const nextGallery = gallery.filter((item) => item.id !== req.params.imageId)

  if (nextGallery.length === gallery.length) {
    return res.status(404).json({ message: 'Gallery image not found' })
  }

  db.projects[index] = {
    ...db.projects[index],
    gallery: nextGallery,
  }

  writeDb(db)
  return res.status(204).send()
})

app.delete('/api/projects/:id', authRequired, adminRequired, (req, res) => {
  const db = readDb()
  const beforeCount = db.projects.length
  db.projects = db.projects.filter((item) => item.id !== req.params.id)

  if (db.projects.length === beforeCount) {
    return res.status(404).json({ message: 'projects item not found' })
  }

  writeDb(db)
  return res.status(204).send()
})

function registerCmsRoutes(name, idPrefix) {
  app.get(`/api/${name}`, (_req, res) => {
    const db = readDb()
    res.json(db[name])
  })

  app.post(`/api/${name}`, authRequired, adminRequired, (req, res) => {
    const db = readDb()
    const item = {
      id: makeId(idPrefix, db[name]),
      ...req.body,
      createdAt: new Date().toISOString().slice(0, 10),
    }
    db[name].unshift(item)
    writeDb(db)
    res.status(201).json(item)
  })

  app.delete(`/api/${name}/:id`, authRequired, adminRequired, (req, res) => {
    const db = readDb()
    const beforeCount = db[name].length
    db[name] = db[name].filter((item) => item.id !== req.params.id)

    if (db[name].length === beforeCount) {
      return res.status(404).json({ message: `${name} item not found` })
    }

    writeDb(db)
    res.status(204).send()
  })
}

registerCmsRoutes('testimonials', 'TST')
registerCmsRoutes('blogs', 'BLG')

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`)
})
