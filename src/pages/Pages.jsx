import React from 'react'
import {
  featureGroups,
  homepageTemplate,
  blogPosts,
  credentials,
  designGallery,
  guarantees,
  mvpPlan,
  pageLayouts,
  pricingPackages,
  priceCalculators,
  processSteps,
  roadmap,
  serviceDetails,
  serviceOfferings,
  serviceTemplate,
  sitemap,
  team,
  wireframes,
} from '../data/siteData'

function LeadForm({ onSubmit, heading, buttonText, source }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const payload = {
      source,
      name: formData.get('name'),
      phone: formData.get('phone'),
      location: formData.get('location'),
      propertyType: formData.get('propertyType'),
      budget: formData.get('budget'),
      timeline: formData.get('timeline'),
      message: formData.get('message'),
    }

    onSubmit(payload)
    event.currentTarget.reset()
  }

  return (
    <article className="card full-width">
      <h3>{heading}</h3>
      <form className="lead-form" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input name="name" required placeholder="Your name" />
        </label>
        <label>
          Phone
          <input name="phone" required placeholder="+91" />
        </label>
        <label>
          Location
          <input name="location" required placeholder="City" />
        </label>
        <label>
          Property Type
          <select name="propertyType" defaultValue="2BHK Apartment">
            <option>2BHK Apartment</option>
            <option>3BHK Apartment</option>
            <option>Villa</option>
            <option>Office</option>
            <option>Retail</option>
          </select>
        </label>
        <label>
          Budget
          <select name="budget" defaultValue="8-12 lakh">
            <option>Under 5 lakh</option>
            <option>5-8 lakh</option>
            <option>8-12 lakh</option>
            <option>12-20 lakh</option>
            <option>20+ lakh</option>
          </select>
        </label>
        <label>
          Start Timeline
          <select name="timeline" defaultValue="Within 2 months">
            <option>Within 1 month</option>
            <option>Within 2 months</option>
            <option>Within 3 months</option>
            <option>Exploring options</option>
          </select>
        </label>
        <label className="field-wide">
          Project Brief
          <textarea name="message" rows="3" placeholder="Share details about style and scope" />
        </label>
        <button className="action-primary" type="submit">
          {buttonText}
        </button>
      </form>
    </article>
  )
}

export function HomePage({ onLeadSubmit }) {
  return (
    <section className="panel-grid">
      <article className="hero-card">
        <p className="kicker">Design. Execute. Delight.</p>
        <h2>Luxury interiors, measurable delivery, seamless digital journey.</h2>
        <p>
          This platform now uses route-based pages, operational lead capture, and an admin view for
          converting inquiries into active projects.
        </p>
        <div className="stat-row">
          <div>
            <strong>500+</strong>
            <span>Projects Delivered</span>
          </div>
          <div>
            <strong>30 Days</strong>
            <span>MVP Launch Target</span>
          </div>
          <div>
            <strong>24 Hrs</strong>
            <span>Lead Response Commitment</span>
          </div>
        </div>
      </article>

      <article className="card">
        <h3>Exact Sitemap</h3>
        <ol>
          {sitemap.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </article>

      <article className="card full-width">
        <h3>Page-Wise Section Layout</h3>
        <div className="layout-grid">
          {pageLayouts.map((layout) => (
            <div key={layout.page} className="layout-card">
              <h4>{layout.page}</h4>
              <ul>
                {layout.sections.map((section) => (
                  <li key={section}>{section}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </article>

      <LeadForm
        onSubmit={onLeadSubmit}
        heading="Get Free Consultation"
        buttonText="Submit Inquiry"
        source="Website Form"
      />
    </section>
  )
}

export function ServicesPage({ onLeadSubmit }) {
  return (
    <section className="panel-grid">
      <article className="card full-width">
        <h3>Service Catalog</h3>
        <div className="layout-grid">
          {serviceDetails.map((service) => (
            <div key={service.title} className="layout-card">
              <h4>{service.title}</h4>
              <p>{service.summary}</p>
              <ul>
                {service.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </article>
      <article className="card">
        <h3>Pricing Packages</h3>
        {pricingPackages.map((pkg) => (
          <div key={pkg.name} className="package-row">
            <h4>{pkg.name}</h4>
            <p>{pkg.priceRange}</p>
            <span>{pkg.scope}</span>
          </div>
        ))}
      </article>
      <article className="card">
        <h3>MVP 30-Day Launch</h3>
        <ol>
          {mvpPlan.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </article>

      <LeadForm
        onSubmit={onLeadSubmit}
        heading="Request a Tailored Quote"
        buttonText="Request Quote"
        source="Services Page"
      />
    </section>
  )
}

export function FeaturesPage() {
  return (
    <section className="panel-grid">
      {featureGroups.map((group) => (
        <article className="card" key={group.title}>
          <h3>{group.title}</h3>
          <ul>
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  )
}

export function WireframesPage() {
  return (
    <section className="panel-grid">
      {wireframes.map((frame) => (
        <article className="card" key={frame.page}>
          <h3>{frame.page}</h3>
          <ol>
            {frame.structure.map((row) => (
              <li key={row}>{row}</li>
            ))}
          </ol>
        </article>
      ))}
    </section>
  )
}

export function RoadmapPage() {
  return (
    <section className="panel-grid">
      {roadmap.map((phase) => (
        <article className="card" key={phase.phase}>
          <h3>{phase.phase}</h3>
          <p>{phase.window}</p>
          <ul>
            {phase.deliverables.map((deliverable) => (
              <li key={deliverable}>{deliverable}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  )
}

export function TemplatesPage() {
  return (
    <section className="panel-grid">
      <article className="card full-width">
        <h3>Homepage Content Template</h3>
        {homepageTemplate.map((section) => (
          <div key={section.heading} className="template-row">
            <h4>{section.heading}</h4>
            <p>{section.copy}</p>
          </div>
        ))}
      </article>
      <article className="card full-width">
        <h3>Services Page Content Template</h3>
        {serviceTemplate.map((section) => (
          <div key={section.heading} className="template-row">
            <h4>{section.heading}</h4>
            <p>{section.copy}</p>
          </div>
        ))}
      </article>
    </section>
  )
}

export function ContactPage({ onLeadSubmit }) {
  return (
    <section className="panel-grid">
      <article className="card">
        <h3>Contact Details</h3>
        <p>Phone: +91 90000 11111</p>
        <p>Email: hello@manishinteriors.in</p>
        <p>Office: Baner Road, Pune</p>
      </article>
      <article className="card">
        <h3>Fast Booking</h3>
        <p>Book a free consultation and receive design direction within 24 hours.</p>
      </article>
      <LeadForm
        onSubmit={onLeadSubmit}
        heading="Book Consultation"
        buttonText="Book Slot"
        source="Booking Page"
      />
    </section>
  )
}

function AuthCard({ auth, title, helperText, defaultEmail, defaultPassword, buttonLabel }) {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    await auth.login({
      email: formData.get('email'),
      password: formData.get('password'),
    })
    event.currentTarget.reset()
  }

  return (
    <article className="card full-width">
      <h3>{title}</h3>
      <p>{helperText}</p>
      <form className="lead-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" name="email" defaultValue={defaultEmail} required />
        </label>
        <label>
          Password
          <input type="password" name="password" defaultValue={defaultPassword} required />
        </label>
        <button className="action-primary" type="submit" disabled={auth.loading}>
          {auth.loading ? 'Signing in...' : buttonLabel}
        </button>
      </form>
      {auth.error ? <p className="error-text">{auth.error}</p> : null}
    </article>
  )
}

function CmsPanel({ title, moduleName, rows, fields, onCreate, onDelete }) {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const payload = {}
    fields.forEach((field) => {
      payload[field.name] = formData.get(field.name)
    })
    await onCreate(moduleName, payload)
    event.currentTarget.reset()
  }

  return (
    <article className="card full-width">
      <h3>{title}</h3>
      <form className="lead-form" onSubmit={handleSubmit}>
        {fields.map((field) => (
          <label key={field.name} className={field.wide ? 'field-wide' : ''}>
            {field.label}
            {field.type === 'textarea' ? (
              <textarea name={field.name} rows="3" required={field.required !== false} />
            ) : (
              <input type={field.type || 'text'} name={field.name} required={field.required !== false} />
            )}
          </label>
        ))}
        <button className="action-primary" type="submit">
          Add {title}
        </button>
      </form>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Preview</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.title || row.name || row.message}</td>
                <td>
                  <button type="button" className="danger-link" onClick={() => onDelete(moduleName, row.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  )
}

function ProjectGalleryManager({ projects, onAddImage, onDeleteImage }) {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    await onAddImage(formData.get('projectId'), {
      stage: formData.get('stage'),
      imageUrl: formData.get('imageUrl'),
      caption: formData.get('caption'),
    })
    event.currentTarget.reset()
  }

  return (
    <article className="card full-width">
      <h3>Project Before and After Gallery</h3>
      <form className="lead-form" onSubmit={handleSubmit}>
        <label>
          Project
          <select name="projectId" defaultValue={projects[0]?.id || ''} required>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.id} - {project.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Stage
          <select name="stage" defaultValue="before">
            <option value="before">Before</option>
            <option value="after">After</option>
          </select>
        </label>
        <label className="field-wide">
          Image URL
          <input name="imageUrl" placeholder="https://..." required />
        </label>
        <label className="field-wide">
          Caption
          <input name="caption" placeholder="Optional caption" />
        </label>
        <button className="action-primary" type="submit" disabled={projects.length === 0}>
          Add Gallery Image
        </button>
      </form>

      {projects.map((project) => {
        const gallery = Array.isArray(project.gallery) ? project.gallery : []
        return (
          <div key={project.id} className="gallery-block">
            <h4>{project.title}</h4>
            {gallery.length === 0 ? (
              <p>No gallery images yet.</p>
            ) : (
              <div className="mini-gallery-grid">
                {gallery.map((image) => (
                  <div key={image.id} className="mini-gallery-card">
                    <img src={image.imageUrl} alt={image.caption || `${project.title} ${image.stage}`} />
                    <p>
                      {image.stage.toUpperCase()}: {image.caption || 'Untitled'}
                    </p>
                    <button
                      type="button"
                      className="danger-link"
                      onClick={() => onDeleteImage(project.id, image.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </article>
  )
}

export function AdminPage({
  auth,
  leads,
  stats,
  leadsLoading,
  leadsError,
  onRefreshLeads,
  onStatusChange,
  cms,
}) {
  if (!auth.isAdmin) {
    return (
      <section className="panel-grid">
        <AuthCard
          auth={auth}
          title="Admin Sign In"
          helperText="Use admin@manishinteriors.in and admin123 to access backend management."
          defaultEmail="admin@manishinteriors.in"
          defaultPassword="admin123"
          buttonLabel="Sign In"
        />
      </section>
    )
  }

  return (
    <section className="panel-grid">
      <article className="card full-width">
        <h3>Lead Dashboard</h3>
        <p>Signed in as {auth.user?.email}</p>
        <div className="toolbar-row">
          <button className="action-secondary" onClick={onRefreshLeads}>
            Refresh Leads
          </button>
          <button className="action-secondary" onClick={auth.logout}>
            Sign Out
          </button>
        </div>
        {leadsLoading ? <p>Loading leads...</p> : null}
        {leadsError ? <p className="error-text">{leadsError}</p> : null}
        <div className="stat-row admin-stats">
          <div>
            <strong>{stats.total}</strong>
            <span>Total Leads</span>
          </div>
          <div>
            <strong>{stats.newLeads}</strong>
            <span>New</span>
          </div>
          <div>
            <strong>{stats.proposalSent}</strong>
            <span>Proposal Sent</span>
          </div>
          <div>
            <strong>{stats.closed}</strong>
            <span>Closed</span>
          </div>
        </div>
      </article>
      <article className="card full-width">
        <h3>Lead Pipeline</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Budget</th>
                <th>Source</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.id}</td>
                  <td>{lead.name}</td>
                  <td>{lead.location}</td>
                  <td>{lead.budget}</td>
                  <td>{lead.source}</td>
                  <td>
                    <select
                      value={lead.status}
                      onChange={(event) => onStatusChange(lead.id, event.target.value)}
                    >
                      <option>New</option>
                      <option>Contacted</option>
                      <option>Site Visit</option>
                      <option>Proposal Sent</option>
                      <option>Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <CmsPanel
        title="Projects"
        moduleName="projects"
        rows={cms.projects}
        onCreate={cms.createItem}
        onDelete={cms.deleteItem}
        fields={[
          { name: 'title', label: 'Title' },
          { name: 'location', label: 'Location' },
          { name: 'style', label: 'Style' },
          { name: 'budget', label: 'Budget' },
          { name: 'duration', label: 'Duration' },
          { name: 'clientEmail', label: 'Client Email' },
          { name: 'status', label: 'Status' },
          { name: 'progress', label: 'Progress %', type: 'number' },
        ]}
      />

      <CmsPanel
        title="Testimonials"
        moduleName="testimonials"
        rows={cms.testimonials}
        onCreate={cms.createItem}
        onDelete={cms.deleteItem}
        fields={[
          { name: 'name', label: 'Client Name' },
          { name: 'rating', label: 'Rating', type: 'number' },
          { name: 'message', label: 'Message', type: 'textarea', wide: true },
        ]}
      />

      <CmsPanel
        title="Blogs"
        moduleName="blogs"
        rows={cms.blogs}
        onCreate={cms.createItem}
        onDelete={cms.deleteItem}
        fields={[
          { name: 'title', label: 'Title' },
          { name: 'slug', label: 'Slug' },
          { name: 'excerpt', label: 'Excerpt', type: 'textarea', wide: true },
          { name: 'publishedAt', label: 'Published Date', type: 'date' },
        ]}
      />

      <ProjectGalleryManager
        projects={cms.projects}
        onAddImage={cms.addProjectImage}
        onDeleteImage={cms.removeProjectImage}
      />

      {cms.loading ? <p>Loading CMS collections...</p> : null}
      {cms.error ? <p className="error-text">{cms.error}</p> : null}
    </section>
  )
}

export function ClientPage({ auth, projects, loading, error, onRefreshProjects }) {
  if (!auth.isClient && !auth.isAdmin) {
    return (
      <section className="panel-grid">
        <AuthCard
          auth={auth}
          title="Client Sign In"
          helperText="Use client@manishinteriors.in and client123 to view live project tracking."
          defaultEmail="client@manishinteriors.in"
          defaultPassword="client123"
          buttonLabel="Open Tracker"
        />
      </section>
    )
  }

  return (
    <section className="panel-grid">
      <article className="card full-width">
        <h3>Client Project Tracker</h3>
        <p>Signed in as {auth.user?.email}</p>
        <div className="toolbar-row">
          <button className="action-secondary" onClick={onRefreshProjects}>
            Refresh Tracker
          </button>
          <button className="action-secondary" onClick={auth.logout}>
            Sign Out
          </button>
        </div>
        {loading ? <p>Loading project updates...</p> : null}
        {error ? <p className="error-text">{error}</p> : null}
      </article>

      {projects.map((project) => (
        <article className="card" key={project.id}>
          <h3>{project.title}</h3>
          <p>
            {project.location} • {project.style}
          </p>
          <p>
            Budget: {project.budget} • Timeline: {project.duration}
          </p>
          <p>
            Stage: <strong>{project.status || 'Planning'}</strong>
          </p>
          <div className="progress-track" role="progressbar" aria-valuenow={project.progress || 0}>
            <div className="progress-fill" style={{ width: `${project.progress || 0}%` }} />
          </div>
          <p>{project.progress || 0}% completed</p>
          <div className="client-gallery">
            <h4>Before and After</h4>
            <div className="mini-gallery-grid">
              {(Array.isArray(project.gallery) ? project.gallery : []).map((image) => (
                <div key={image.id} className="mini-gallery-card">
                  <img src={image.imageUrl} alt={image.caption || `${project.title} ${image.stage}`} />
                  <p>
                    {image.stage.toUpperCase()}: {image.caption || 'Untitled'}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <ul>
            {(project.milestones || []).map((step) => (
              <li key={step.name}>{step.done ? 'Done' : 'Pending'}: {step.name}</li>
            ))}
          </ul>
        </article>
      ))}

      {!loading && projects.length === 0 ? (
        <article className="card full-width">
          <h3>No assigned projects yet</h3>
          <p>Your dashboard will show project milestones as soon as the design team assigns your project.</p>
        </article>
      ) : null}
    </section>
  )
}

// ====== NEW LIVSPACE-STYLE PAGES ======

export function PriceCalculatorPage() {
  const [selectedTool, setSelectedTool] = React.useState('fullHome')
  const [values, setValues] = React.useState({})
  const [estimate, setEstimate] = React.useState(null)

  const calculateEstimate = () => {
    const tool = priceCalculators[selectedTool]
    const basePrice = parseInt(tool.startingPrice.replace(/,/g, ''))
    const multiplier = selectedTool === 'fullHome' ? 1.1 : selectedTool === 'kitchen' ? 1.08 : 1.05
    const estimated = Math.round(basePrice * multiplier)
    setEstimate(estimated)
  }

  const tool = priceCalculators[selectedTool]

  return (
    <section className="panel-grid">
      <article className="card full-width">
        <h2>Interior Design Price Calculator</h2>
        <p>Get an instant estimate for your dream home. Answer a few quick questions and we'll show you what's possible!</p>
      </article>

      <div className="tab-group" role="tablist">
        {Object.entries(priceCalculators).map(([key, calc]) => (
          <button
            key={key}
            role="tab"
            aria-selected={selectedTool === key}
            className={`tab ${selectedTool === key ? 'active' : ''}`}
            onClick={() => {
              setSelectedTool(key)
              setEstimate(null)
              setValues({})
            }}
          >
            {calc.title}
          </button>
        ))}
      </div>

      <article className="card">
        <h3>{tool.title}</h3>
        <p>{tool.description}</p>
        <p className="highlight-text">Starting at ₹{tool.startingPrice}</p>

        <form className="lead-form">
          {tool.questions.map((q) => (
            <label key={q.id} className={q.type === 'textarea' ? 'field-wide' : ''}>
              {q.label}
              {q.type === 'range' ? (
                <input type="range" min={q.min} max={q.max} onChange={(e) => setValues({ ...values, [q.id]: e.target.value })} />
              ) : q.type === 'textarea' ? (
                <textarea onChange={(e) => setValues({ ...values, [q.id]: e.target.value })} />
              ) : (
                <select onChange={(e) => setValues({ ...values, [q.id]: e.target.value })}>
                  {q.options.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              )}
            </label>
          ))}
          <button type="button" className="action-primary" onClick={calculateEstimate}>
            Calculate Estimate
          </button>
        </form>

        {estimate && (
          <div className="estimate-result" style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f8f0', borderRadius: '8px' }}>
            <h4>Your Estimated Cost:</h4>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#2c5f2d' }}>₹{estimate.toLocaleString()}</p>
            <p>This is an approximate estimate. Final cost may vary based on exact requirements and design complexity.</p>
            <button className="action-primary">Book Free Consultation</button>
          </div>
        )}
      </article>
    </section>
  )
}

export function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = React.useState(null)

  return (
    <section className="panel-grid">
      <article className="card full-width">
        <h2>Design Inspiration Gallery</h2>
        <p>Explore thousands of beautifully designed spaces curated just for you. Filter by room type and find your perfect style.</p>
      </article>

      <div className="gallery-categories">
        {designGallery.categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-button ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
          >
            <span className="icon">{cat.icon}</span>
            <p>{cat.name}</p>
            <p className="count">{cat.count} designs</p>
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {designGallery.sampleDesigns.map((design) => (
          <article key={design.id} className="gallery-card">
            <div className="gallery-image" style={{ backgroundColor: '#e0e0e0', height: '200px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p>Image: {design.title}</p>
            </div>
            <h4>{design.title}</h4>
            <p>{design.style}</p>
            <button className="action-secondary">View Details</button>
          </article>
        ))}
      </div>

      <article className="card full-width">
        <button className="action-primary" style={{ width: '100%' }}>
          View All 5000+ Designs
        </button>
      </article>
    </section>
  )
}

export function ProcessPage() {
  return (
    <section className="panel-grid">
      <article className="card full-width">
        <h2>Our Proven 5-Step Process</h2>
        <p>From consultation to move-in, we handle every detail to make your journey seamless and stress-free.</p>
      </article>

      <div className="process-timeline">
        {processSteps.map((step, idx) => (
          <div key={step.step} className="process-step">
            <div className="step-number">{step.step}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <button className="action-secondary">{step.action}</button>
            {idx < processSteps.length - 1 && <div className="step-connector" />}
          </div>
        ))}
      </div>

      <article className="card full-width">
        <h3>Why Our Process Works</h3>
        <ul>
          <li>✓ Transparent communication at every stage</li>
          <li>✓ Regular progress updates on WhatsApp</li>
          <li>✓ Quality checks at multiple stages</li>
          <li>✓ Flexible payment milestones</li>
          <li>✓ Dedicated project manager assigned</li>
        </ul>
      </article>
    </section>
  )
}

export function TeamPage() {
  return (
    <section className="panel-grid">
      <article className="card full-width">
        <h2>Meet Our Award-Winning Team</h2>
        <p>20+ years of combined experience in luxury interior design and renovation.</p>
      </article>

      <div className="credentials-strip">
        <div className="cred-item">
          <p className="cred-number">{credentials.projectsCompleted}</p>
          <p className="cred-label">Projects Completed</p>
        </div>
        <div className="cred-item">
          <p className="cred-number">{credentials.happyClients}</p>
          <p className="cred-label">Happy Clients</p>
        </div>
        <div className="cred-item">
          <p className="cred-number">{credentials.designersTeam}</p>
          <p className="cred-label">Designers</p>
        </div>
        <div className="cred-item">
          <p className="cred-number">{credentials.yearsExperience}+</p>
          <p className="cred-label">Years Experience</p>
        </div>
      </div>

      <div className="team-grid">
        {team.map((member) => (
          <article key={member.name} className="team-card">
            <div className="team-avatar" style={{ backgroundColor: '#e0e0e0', height: '150px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p>{member.name[0]}</p>
            </div>
            <h3>{member.name}</h3>
            <p className="title">{member.title}</p>
            <p>{member.bio}</p>
            <p className="specialization">Specialization: {member.specialization}</p>
          </article>
        ))}
      </div>

      <article className="card full-width">
        <h3>Awards & Recognition</h3>
        <ul>
          {credentials.awards.map((award) => (
            <li key={award.name}>
              🏆 <strong>{award.name}</strong> - {award.org}
            </li>
          ))}
        </ul>
      </article>
    </section>
  )
}

export function BlogPage() {
  return (
    <section className="panel-grid">
      <article className="card full-width">
        <h2>Design Trends & Tips</h2>
        <p>Explore the latest interior design trends, space-saving tips, and expert advice from our team.</p>
      </article>

      <div className="blog-grid">
        {blogPosts.map((post) => (
          <article key={post.id} className="blog-card">
            <div className="blog-image" style={{ backgroundColor: '#e0e0e0', height: '180px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p>Image: {post.title}</p>
            </div>
            <h3>{post.title}</h3>
            <p className="meta">
              {post.author} • {post.date}
            </p>
            <p className="category">{post.category}</p>
            <p>{post.excerpt}</p>
            <button className="action-secondary">Read Article</button>
          </article>
        ))}
      </div>

      <article className="card full-width">
        <h3>Subscribe to Our Design Newsletter</h3>
        <p>Get weekly tips and exclusive design inspiration delivered to your inbox.</p>
        <form className="lead-form" style={{ maxWidth: '400px' }}>
          <input type="email" placeholder="Your email address" required />
          <button type="submit" className="action-primary">
            Subscribe Now
          </button>
        </form>
      </article>
    </section>
  )
}

export function GuaranteesPage() {
  return (
    <section className="panel-grid">
      <article className="card full-width">
        <h2>Why Choose Manish Interiors</h2>
        <p>We stand behind our work with industry-leading warranties, quality guarantees, and customer satisfaction.</p>
      </article>

      <div className="guarantees-grid">
        {guarantees.map((g, idx) => (
          <article key={idx} className="guarantee-card">
            <p className="guarantee-icon">{g.icon}</p>
            <h4>{g.title}</h4>
            <p>{g.description}</p>
          </article>
        ))}
      </div>

      <article className="card full-width">
        <h2>Our Service Offerings</h2>
      </article>

      <div className="service-offerings">
        {serviceOfferings.map((offering) => (
          <article key={offering.id} className="offering-card">
            <h3>{offering.name}</h3>
            <p className="price">Starting at ₹{offering.startingPrice}</p>
            <p>{offering.description}</p>
            <ul>
              {offering.features.map((feature) => (
                <li key={feature}>✓ {feature}</li>
              ))}
            </ul>
            <button className="action-primary">Learn More</button>
          </article>
        ))}
      </div>
    </section>
  )
}
