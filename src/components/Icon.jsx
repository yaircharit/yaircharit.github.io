import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaFile } from "react-icons/fa";

// Map icon names to icon components
const Icons = {
  resume: FaFile,
  github: FaGithub,
  linkedin: FaLinkedin,
  email: FaEnvelope,
};


export default function Icon({ name, size = 32, color = "inherit", ...props }) {
  const Icon = Icons[name.toLowerCase()];
  if (!Icon) return null;
  return <Icon size={size} color={color} {...props} />;
}