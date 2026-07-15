import { FaFile, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const icons = {
    FaFile,
    FaGithub,
    FaLinkedin,
    FaEnvelope,
};

export default function Icon({ name, size = 32, color, ...props }) {
    // Use CSS variable for color if not explicitly set
    const iconColor = color ?? "var(--icon-color, currentColor)";
    const IconComponent = icons[name];
    if (!IconComponent) return null;
    return <IconComponent size={size} color={iconColor} {...props} />;
}