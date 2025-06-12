import { useState, useEffect } from 'react'
import timelineData from '../../data/timeline.json'
import './Timeline.css'

const Timeline = () => {
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    // Set the last item as expanded by default
    const lastItem = timelineData.timeline[timelineData.timeline.length - 1];
    setExpandedId(lastItem.id);
  }, []);

  const handleItemClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="timeline">
      <div className="timeline-line"></div>      
        <div className="timeline-items">
          {[...timelineData.timeline].reverse().map((item, index) => (
            <div 
              key={item.id} 
              className={`timeline-item ${expandedId === item.id ? 'expanded' : ''}`}
              onClick={() => handleItemClick(item.id)}
            >
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

export default Timeline
