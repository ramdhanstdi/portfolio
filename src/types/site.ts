export type SiteLink = {
  label: string
  href: string
  external?: boolean
}

export type HeroCtas = {
  primary: SiteLink
  secondary: SiteLink
}

export type SiteHero = {
  name: string
  title: string
  location: string
  tagline: string
  profileImage: {
    src: string
    alt: string
  }
  ctas: HeroCtas
}

export type SiteAbout = {
  sectionTitle: string
  paragraphs: string[]
}

export type SkillGroup = {
  title: string
  items: string[]
}

export type SiteSkills = {
  sectionTitle: string
  groups: SkillGroup[]
}

export type Certification = {
  title: string
}

export type SiteCertifications = {
  sectionTitle: string
  items: Certification[]
}

export type ExperienceItem = {
  role: string
  company: string
  location?: string
  period: string
  bullets?: string[]
}

export type SiteExperience = {
  sectionTitle: string
  items: ExperienceItem[]
}

export type PortfolioItem = {
  id: string
  title: string
  description: string
  tags: string[]
  image: {
    src: string
    alt: string
  }
  liveUrl?: string
  repoUrl?: string
}

export type SitePortfolio = {
  sectionTitle: string
  intro: string
  emptyState: string
  filter: {
    label: string
    allLabel: string
  }
  links: {
    liveLabel: string
    repoLabel: string
  }
  items: PortfolioItem[]
}

export type SiteContact = {
  sectionTitle: string
  phone: string
  email: string
  linkedin: string
  buttons: {
    emailLabel: string
    linkedinLabel: string
  }
}

export type SiteFooter = {
  text: string
  links: SiteLink[]
  copyrightTemplate: string
}

export type SiteSeo = {
  title: string
  description: string
  ogImage?: string
}

export type SiteA11y = {
  skipToContentLabel: string
  primaryNavLabel: string
  socialLinksLabel: string
  portfolioTagFilterLabel: string
  skillsListLabel: string
}

export type SiteUi = {
  nav: {
    brandLabel: string
  }
}

export type SiteData = {
  seo: SiteSeo
  a11y: SiteA11y
  ui: SiteUi
  header: {
    nav: SiteLink[]
  }
  hero: SiteHero
  about: SiteAbout
  skills: SiteSkills
  certifications: SiteCertifications
  experience: SiteExperience
  portfolio: SitePortfolio
  contact: SiteContact
  footer: SiteFooter
}
