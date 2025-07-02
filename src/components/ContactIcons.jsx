import React from "react";
import { Link } from "react-router-dom";
import {contactData} from "../data/myData.json";
import Icon from "./Icon";

function isExternal(url) {
  return /^https?:\/\//i.test(url) || url.startsWith("mailto:");
}

export default function ContactIcons({ ignoreDarkMode = false }) {
  return (
    <div className={`contact-icons${ignoreDarkMode ? " ignore-darkmode" : ""}`}>
      {Object.entries(contactData).map(([label, url]) =>
        isExternal(url) ? (
          <a
            key={label}
            href={url}
            className="contact-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            style={{ fontSize: "2rem", margin: "0 0.5rem" }}
          >
            <Icon name={label} />
          </a>
        ) : (
          <Link
            key={label}
            to={url}
            className="contact-icon"
            aria-label={label}
            style={{ fontSize: "2rem", margin: "0 0.5rem" }}
          >
            <Icon name={label} />
          </Link>
        )
      )}
    </div>
  );
}
