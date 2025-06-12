import '../styles/ContactIcons.css'
import contactData from '../data/contact.json'

const ContactIcons = ({ color = 'white' }) => {  // default to white if no color provided
  const icons = {
    resume: '📄',
    linkedin: '',
    email: '✉',
    github: '',
    //phone: '📱',
    //whatsapp: ''
  }

  const contacts = Object.entries(contactData.contacts).map(([id, data]) => ({
    id,
    icon: icons[id],
    label: data.label,
    link: data.url
  }))

  return (
    <div className="contact-icons" style={{ color }}>
      {contacts.map((contact) => (
        <a
          key={contact.id}
          href={contact.link}
          className="contact-icon"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={contact.label}
        >
          <span className={`icon-${contact.id}`}>{contact.icon}</span>
        </a>
      ))}
    </div>
  )
}

export default ContactIcons
