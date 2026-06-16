// Thin-stroke icon set, Phosphor/Lucide-style (1.5px stroke)
const Icon = ({ children, size = 20, strokeWidth = 1.5, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth={strokeWidth}
       strokeLinecap="round" strokeLinejoin="round" style={style}>
    {children}
  </svg>
);

const IconSearch = (p) => (
  <Icon {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Icon>
);
const IconUser = (p) => (
  <Icon {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></Icon>
);
const IconBag = (p) => (
  <Icon {...p}>
    <path d="M5 7h14l-1.2 12.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 7Z" />
    <path d="M9 7V5a3 3 0 0 1 6 0v2" />
  </Icon>
);
const IconChevron = (p) => (
  <Icon {...p}><path d="m6 9 6 6 6-6" /></Icon>
);
const IconChevronRight = (p) => (
  <Icon {...p}><path d="m9 6 6 6-6 6" /></Icon>
);
const IconArrowRight = (p) => (
  <Icon {...p}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></Icon>
);
const IconMenu = (p) => (
  <Icon {...p}><path d="M4 7h16" /><path d="M4 17h16" /></Icon>
);
const IconInstagram = (p) => (
  <Icon {...p}>
    <rect x="3" y="3" width="18" height="18" rx="4.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
  </Icon>
);
const IconTikTok = (p) => (
  <Icon {...p}>
    <path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5" />
    <path d="M14 4c.5 2.5 2.5 4 5 4" />
  </Icon>
);
const IconFacebook = (p) => (
  <Icon {...p}>
    <path d="M14 9h3V5h-3a3 3 0 0 0-3 3v3H8v4h3v6h4v-6h3l1-4h-4V8a1 1 0 0 1 1-1Z" />
  </Icon>
);

// PDP icons
const IconStar = ({ size = 14, filled = true, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"
       fill={filled ? color : "none"} stroke={color}
       strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" />
  </svg>
);
const IconMinus = (p) => (<Icon {...p}><path d="M5 12h14" /></Icon>);
const IconPlus = (p) => (<Icon {...p}><path d="M12 5v14" /><path d="M5 12h14" /></Icon>);
const IconZoom = (p) => (<Icon {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /><path d="M8 11h6" /><path d="M11 8v6" /></Icon>);
const IconRuler = (p) => (<Icon {...p}><path d="M3 16 16 3l5 5L8 21Z" /><path d="m7 14 2 2" /><path d="m10 11 2 2" /><path d="m13 8 2 2" /></Icon>);
const IconTruck = (p) => (<Icon {...p}><path d="M3 7h11v9H3z" /><path d="M14 10h5l2 3v3h-7" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></Icon>);
const IconReturnArrow = (p) => (<Icon {...p}><path d="M9 14 4 9l5-5" /><path d="M4 9h11a5 5 0 0 1 0 10h-3" /></Icon>);
const IconPin = (p) => (<Icon {...p}><path d="M12 22s7-7.4 7-13a7 7 0 1 0-14 0c0 5.6 7 13 7 13Z" /><circle cx="12" cy="9" r="2.5" /></Icon>);
const IconInfo = (p) => (<Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><path d="M12 8v.5" /></Icon>);
const IconChevronDown = IconChevron;
const IconClose = (p) => (<Icon {...p}><path d="M6 6l12 12" /><path d="M18 6 6 18" /></Icon>);
const IconCheck = (p) => (<Icon {...p}><path d="m4 12 5 5L20 7" /></Icon>);
const IconMail = (p) => (<Icon {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Icon>);

// Theme toggle icons
const IconSun = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" /><path d="M12 20v2" />
    <path d="m4.9 4.9 1.4 1.4" /><path d="m17.7 17.7 1.4 1.4" />
    <path d="M2 12h2" /><path d="M20 12h2" />
    <path d="m4.9 19.1 1.4-1.4" /><path d="m17.7 6.3 1.4-1.4" />
  </Icon>
);
const IconMoon = (p) => (
  <Icon {...p}><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8Z" /></Icon>
);

Object.assign(window, {
  IconStar, IconMinus, IconPlus, IconZoom, IconRuler,
  IconTruck, IconReturnArrow, IconPin, IconInfo, IconChevronDown, IconClose,
  IconCheck, IconMail, IconSun, IconMoon
});

Object.assign(window, {
  Icon, IconSearch, IconUser, IconBag, IconChevron, IconChevronRight,
  IconArrowRight, IconMenu, IconInstagram, IconTikTok, IconFacebook
});
