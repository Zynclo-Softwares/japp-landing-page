// Video embedding is disabled by the owner — open directly on YouTube
export default function VideoModal({ open }) {
  if (open) {
    window.open('https://youtu.be/YRgo4OErGXw', '_blank', 'noopener,noreferrer');
  }
  return null;
}