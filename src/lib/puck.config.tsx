import type { Config } from '@puckeditor/core';
import { ImageUploader } from '../components/admin/ImageUploader';
import { Link } from 'react-router-dom';

// Component Prop Types
type HeroProps = {
  heading: string;
  body: string;
  ctaText: string;
  ctaUrl: string;
  heroImage: string;
  imageZoom: number;
  imageFocusX: number;
  imageFocusY: number;
};

type BannerProps = {
  title: string;
  body: string;
  bgColor: 'bg-sage-100' | 'bg-lavender-100' | 'bg-gold-100' | 'bg-white';
};

type ServicesProps = {
  introText: string;
  items: { 
    title: string; 
    description: string; 
    imageUrl: string;
    zoom: number;
    focusX: number;
    focusY: number;
  }[];
};

type TeamProps = {
  departmentTitle: string;
  members: { 
    name: string; 
    title: string; 
    bio: string; 
    image: string;
    slug: string;
    zoom: number;
    focusX: number;
    focusY: number;
  }[];
};

type FAQProps = {
  title: string;
  items: { question: string; answer: string }[];
};

type LinksProps = {
  title: string;
  links: { label: string; url: string }[];
};

type PuckConfig = Config<{
  Hero: HeroProps;
  Banner: BannerProps;
  ServicesGrid: ServicesProps;
  TeamDepartment: TeamProps;
  FAQ: FAQProps;
  LinksList: LinksProps;
}, {
  title: string;
  icon?: string;
}>;

export const config: PuckConfig = {
  root: {
    fields: {
      title: { type: "text" },
      icon: { 
        type: "select",
        options: [
          { label: "Globe", value: "FiGlobe" },
          { label: "Home", value: "FiHome" },
          { label: "Briefcase", value: "FiBriefcase" },
          { label: "Help", value: "FiHelpCircle" },
          { label: "Users", value: "FiUsers" },
          { label: "Sun", value: "FiSun" },
          { label: "Map", value: "FiMap" },
          { label: "File", value: "FiFileText" },
          { label: "Headphones", value: "FiHeadphones" },
          { label: "Settings", value: "FiSettings" },
          { label: "Compass", value: "FiCompass" },
          { label: "Smile", value: "FiSmile" },
        ]
      }
    }
  },
  components: {
    Hero: {
      fields: {
        heading: { type: 'text' },
        body: { type: 'textarea' },
        ctaText: { type: 'text' },
        ctaUrl: { type: 'text' },
        heroImage: {
          type: 'custom',
          render: ({ value, onChange }) => (
            <ImageUploader value={value} onChange={onChange} label="Hero Image" />
          )
        },
        imageZoom: {
          type: "number",
          label: "Image Zoom (%)",
          min: 100,
          max: 300,
        },
        imageFocusX: {
          type: "number",
          label: "Focus X (%)",
          min: 0,
          max: 100,
        },
        imageFocusY: {
          type: "number",
          label: "Focus Y (%)",
          min: 0,
          max: 100,
        }
      },
      defaultProps: {
        heading: 'Unfurling Littles',
        body: 'Play-based, child-led therapy.',
        ctaText: 'Get Started',
        ctaUrl: 'https://mail.com',
        heroImage: '',
        imageZoom: 100,
        imageFocusX: 50,
        imageFocusY: 50,
      },
      render: ({ heading, body, ctaText, ctaUrl, heroImage, imageZoom, imageFocusX, imageFocusY }) => (
        <section className="container mx-auto px-4 md:px-6 py-12 md:py-24 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2 flex flex-col gap-6 relative">
            <div className="cloud-shape relative z-10 text-center lg:text-left flex flex-col items-center lg:items-start">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-charcoal leading-tight mb-4">
                {heading}
              </h1>
              <p className="text-lg md:text-xl text-sage-800 leading-relaxed mb-8 max-w-lg">
                {body}
              </p>
              {ctaUrl && ctaText && (
                <a href={ctaUrl} className="btn-sage text-base px-8 py-4 w-fit hover:-translate-y-1">
                  {ctaText}
                </a>
              )}
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-[4/3] w-full rounded-[2rem] overflow-hidden shadow-2xl bg-sage-50">
              {heroImage && (
                <img 
                  referrerPolicy="no-referrer"
                  src={heroImage} 
                  alt={heading}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out"
                  style={{
                    transform: `scale(${imageZoom / 100})`,
                    objectPosition: `${imageFocusX}% ${imageFocusY}%`
                  }}
                />
              )}
            </div>
          </div>
        </section>
      )
    },
    Banner: {
      fields: {
        title: { type: 'text' },
        body: { type: 'textarea' },
        bgColor: {
          type: 'select',
          options: [
            { label: 'Sage', value: 'bg-sage-100' },
            { label: 'Lavender', value: 'bg-lavender-100' },
            { label: 'Gold', value: 'bg-gold-100' },
            { label: 'White', value: 'bg-white' }
          ]
        }
      },
      defaultProps: { title: 'Banner', body: 'This is a banner.', bgColor: 'bg-sage-100' },
      render: ({ title, body, bgColor }) => (
        <section className={`${bgColor} py-16 my-12`}>
          <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-sage-900">
              {title}
            </h2>
            <p className="text-lg text-sage-700 leading-relaxed whitespace-pre-wrap">
              {body}
            </p>
          </div>
        </section>
      )
    },
    ServicesGrid: {
      fields: {
        introText: { type: 'textarea' },
        items: {
          type: 'array',
          getItemSummary: (item) => item.title || 'Service',
          arrayFields: {
            title: { type: 'text' },
            description: { type: 'textarea' },
            imageUrl: {
              type: 'custom',
              render: ({ value, onChange }) => (
                <ImageUploader value={value} onChange={onChange} label="Image" />
              )
            },
            zoom: { type: "number", label: "Zoom (%)", min: 100, max: 250 },
            focusX: { type: "number", label: "Focus X (%)", min: 0, max: 100 },
            focusY: { type: "number", label: "Focus Y (%)", min: 0, max: 100 },
          }
        }
      },
      defaultProps: { 
        introText: 'Our Services', 
        items: [] 
      },
      render: ({ introText, items }) => (
        <div className="container mx-auto px-4 py-8 md:py-16">
          {introText && (
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-charcoal mb-4">Services</h2>
              <p className="text-lg text-sage-800 leading-relaxed font-medium">
                {introText}
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
            {items.map((service, idx) => (
              <div key={idx} className="flex flex-col bg-white rounded-lg overflow-hidden shadow-lg border border-sage-100 card-hover group">
                <div className="aspect-[4/3] w-full bg-sage-50 overflow-hidden relative">
                  {service.imageUrl && (
                    <img 
                      referrerPolicy="no-referrer"
                      src={service.imageUrl} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-300"
                      style={{
                        transform: `scale(${(service.zoom || 100) / 100})`,
                        objectPosition: `${service.focusX || 50}% ${service.focusY || 50}%`
                      }}
                    />
                  )}
                </div>
                <div className="p-8 flex flex-col flex-grow items-center text-center">
                  <h3 className="text-2xl font-heading font-bold text-sage-900 mb-4">{service.title}</h3>
                  <p className="text-charcoal mb-6 leading-relaxed flex-grow whitespace-pre-wrap">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    TeamDepartment: {
      fields: {
        departmentTitle: { type: 'text' },
        members: {
          type: 'array',
          getItemSummary: (item) => item.name || 'Member',
          arrayFields: {
            name: { type: 'text' },
            title: { type: 'text' },
            bio: { type: 'textarea' },
            image: {
              type: 'custom',
              render: ({ value, onChange }) => (
                <ImageUploader value={value} onChange={onChange} label="Headshot" />
              )
            },
            slug: { type: 'text', label: 'Slug (e.g. maggie)' },
            zoom: { type: "number", label: "Zoom (%)", min: 100, max: 250 },
            focusX: { type: "number", label: "Focus X (%)", min: 0, max: 100 },
            focusY: { type: "number", label: "Shift Vertical (%)", min: 0, max: 100 },
          }
        }
      },
      defaultProps: { departmentTitle: 'Department', members: [] },
      render: ({ departmentTitle, members }) => (
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-sage-900 whitespace-nowrap">
              {departmentTitle}
            </h2>
            <div className="h-px w-full bg-sage-200"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
            {members.map((member, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <Link to={`/meet-the-team/${member.slug || 'unknown'}`} className="block hover:scale-[1.02] transition-transform duration-300">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-sage-100 bg-sage-50 relative">
                    {member.image && (
                      <img 
                        referrerPolicy="no-referrer"
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-transform duration-300"
                        style={{
                          transform: `scale(${(member.zoom || 100) / 100})`,
                          objectPosition: `center ${member.focusY || 50}%`
                        }}
                      />
                    )}
                  </div>
                </Link>
                <Link to={`/meet-the-team/${member.slug || 'unknown'}`} className="hover:text-sage-600 transition-colors">
                  <h3 className="text-2xl font-heading font-bold text-charcoal mt-6 mb-1">{member.name}</h3>
                </Link>
                <p className="text-sage-600 font-bold uppercase tracking-widest text-xs mb-3">{member.title}</p>
              </div>
            ))}
          </div>
        </section>
      )
    },
    FAQ: {
      fields: {
        title: { type: 'text' },
        items: {
          type: 'array',
          getItemSummary: (item) => item.question || 'FAQ Item',
          arrayFields: {
            question: { type: 'text' },
            answer: { type: 'textarea' }
          }
        }
      },
      defaultProps: { title: 'FAQ', items: [] },
      render: ({ title, items }) => (
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-heading font-bold mb-8 text-sage-900 border-b pb-4">{title}</h2>
          <div className="flex flex-col gap-6">
            {items.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-sage-100">
                <h3 className="text-xl font-bold text-charcoal mb-2">{item.question}</h3>
                <p className="text-sage-700 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )
    },
    LinksList: {
      fields: {
        title: { type: 'text' },
        links: {
          type: 'array',
          getItemSummary: (item) => item.label || 'Link Item',
          arrayFields: {
            label: { type: 'text' },
            url: { type: 'text' }
          }
        }
      },
      defaultProps: { title: 'Resources', links: [] },
      render: ({ title, links }) => (
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-heading font-bold mb-8 text-sage-900 border-b pb-4">{title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {links.map((link, i) => (
              <a 
                key={i} 
                href={link.url}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-sage-200 hover:border-gold-400 hover:shadow-md transition-all group"
              >
                <span className="font-bold text-sage-800 group-hover:text-gold-600">{link.label}</span>
                <span className="text-sage-300">→</span>
              </a>
            ))}
          </div>
        </section>
      )
    }
  }
};

