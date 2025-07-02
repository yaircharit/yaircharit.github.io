import { useState, useEffect } from 'react'
import {timelineData} from '../data/timeline.json'
import '../styles/Timeline.css'

export default function Timeline() {
  const [expandedId, setExpandedId] = useState(null)
  useEffect(() => {
    setExpandedId(timelineData.at(-1).id)
  }, [])
  return (
    <div className="timeline">
      <div className="timeline-line"></div>
      <div className="timeline-items">
        {[...timelineData].reverse().map(item => (
          <div key={item.id} className={`timeline-item${expandedId === item.id ? ' expanded' : ''}`} onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}>
            <div className="timeline-dot"></div>
            <div className="timeline-date">{item.year}</div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h3>{item.title}</h3>
                <h4>at {item.institution}</h4>
              </div>
              <div className="timeline-details">
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
