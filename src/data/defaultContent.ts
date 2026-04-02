// Main site content for Unfurling Littles
// This file acts as the source of truth for the base seeding of the Appwrite database.

export const defaultContent: { pages: Record<string, any> } = { 
  pages: { 
    home: {
      "content": [
        {
          "type": "Hero",
          "props": {
            "id": "hero-1",
            "heading": "Creating a Culture of Acceptance",
            "body": "Unfurling Littles LLC is a neurodiversity-affirming, licensed IBHS agency providing compassionate care that celebrates different neurotypes. We support every child in living a life aligned with their values.",
            "ctaText": "Our Services",
            "heroImage": "https://static.wixstatic.com/media/dbc86f_82e01dfb39864228af4bf080fa630b91~mv2.jpg"
          }
        },
        {
          "type": "Banner",
          "props": {
            "title": "Welcome to Unfurling Littles",
            "body": "We offer neurodiversity-affirming and trauma-informed services to children aged 18 months to 15 years old. We specialize in ACT, parent support, advocacy, mentorship, and child-led ABA.",
            "bgColor": "bg-sage-50"
          }
        },
        {
          "type": "ServicesGrid",
          "props": {
            "title": "Our Approach",
            "items": [
              { "title": "Affirming Evals", "description": "Neurodiversity-affirming developmental and diagnostic evaluations.", "icon": "FiMap" },
              { "title": "Child-Led Support", "description": "Therapeutic sessions tailored to each child's unique strengths.", "icon": "FiSun" },
              { "title": "Consultation", "description": "Collaborative guidance for families and practitioners.", "icon": "FiUsers" }
            ]
          }
        }
      ],
      "root": { "props": { "title": "Home Page", "icon": "FiHome" } }
    },
    "services": {
      "content": [
        {
          "type": "Banner",
          "props": {
            "title": "Our Services",
            "body": "Unfurling Littles LLC is a Licensed Intensive Behavioral Health (IBHS) agency and Medicaid provider in Pennsylvania, serving Philadelphia and Montgomery Counties.",
            "bgColor": "bg-sage-100"
          }
        },
        {
          "type": "ServicesGrid",
          "props": {
            "title": "Neurodiversity Affirming Support",
            "items": [
              { 
                "title": "Child-Led ABA", 
                "description": "ACT-informed, play-based support building flexible skills at your child’s pace. Available at home, school, or our preschool clinic.", 
                "icon": "FiSun" 
              },
              { 
                "title": "Mental Health Therapy", 
                "description": "Individual and family therapy exploring identity and emotions through consent-based, collaborative care.", 
                "icon": "FiHeart" 
              },
              { 
                "title": "Diagnostic Evaluations", 
                "description": "Assessments for autism, ADHD, and learning differences with curiosity, care, and respect.", 
                "icon": "FiSearch" 
              },
              { 
                "title": "Parties & Events", 
                "description": "Sensory-considerate, child-led birthday celebrations designed to support joyful, low-demand play.", 
                "icon": "FiStar" 
              },
              { 
                "title": "Professional Training", 
                "description": "Support for practitioners seeking to align their work with neurodiversity-affirming values.", 
                "icon": "FiBookOpen" 
              }
            ]
          }
        }
      ],
      "root": { "props": { "title": "Services", "icon": "FiBriefcase" } }
    },
    "faq": {
      "content": [
        {
          "type": "FAQ",
          "props": {
            "title": "Common Questions",
            "items": [
              { "question": "What is neurodiversity-affirming care?", "answer": "It is an approach that recognizes neurological differences as natural human variations rather than deficits to be cured. We prioritize autonomy, connection, and regulation." },
              { "question": "Do you accept insurance?", "answer": "Yes, we are a Medicaid provider and accept many major plans like Independence Blue Cross. Please contact us for specific coverage details." },
              { "question": "What age groups do you serve?", "answer": "We support children and adolescents from 18 months to 15 years old." }
            ]
          }
        }
      ],
      "root": { "props": { "title": "FAQ", "icon": "FiHelpCircle" } }
    },
    "trauma-aba": {
      "content": [
        {
          "type": "Banner",
          "props": {
            "title": "Trauma-Informed ABA Care",
            "body": "At Unfurling Littles LLC, we provide care with a deep realization of how trauma impacts individuals, families, and communities.",
            "bgColor": "bg-sage-600",
            "textColor": "text-white"
          }
        },
        {
          "type": "Banner",
          "props": {
            "title": "What is Trauma?",
            "body": "Trauma happens when an event creates a feeling of being unsafe or helpless. It's not just the experience itself that matters; it's how a person is able to cope with it. For neurodivergent children, things like sensory overload, bullying, and social isolation can lead to increased susceptibility to trauma.",
            "bgColor": "bg-white"
          }
        },
        {
          "type": "Banner",
          "props": {
            "title": "Impact on the Body",
            "body": "Ongoing stress hormones can cause long-term issues: Anxiety, Depression, Digestive problems, Headaches, Muscle tension, Sleep issues, and trouble with focus. Having a caring, supportive person is key to lessening this impact.",
            "bgColor": "bg-sage-50"
          }
        },
        {
          "type": "FAQ",
          "props": {
            "title": "The Four Key Assumptions",
            "items": [
              { "question": "Realization", "answer": "Understanding how trauma impacts mental health and recognizing how it may impede positive outcomes." },
              { "question": "Recognition", "answer": "Identifying signs of trauma through methods like screening, assessment, and supervision." },
              { "question": "Response", "answer": "Applying trauma-informed principles across the organization—adapting policies, procedures, and culture to create a safer environment." },
              { "question": "Resisting Re-Traumatization", "answer": "Being aware of how interventions might unintentionally trigger or worsen traumatic experiences and working to avoid this." }
            ]
          }
        },
        {
          "type": "FAQ",
          "props": {
            "title": "Our 6 Core Principles of Care",
            "items": [
              { "question": "Safety", "answer": "Therapeutic spaces offer sensory accommodations (lights off, noisecancellation, toys) and are set up as 'yes' spaces. Physical interventions are never used unless the child is in imminent danger." },
              { "question": "Trustworthiness and Transparency", "answer": "Interventions are never done 'to' a child without them being aware. We use age-appropriate rationale and never use manipulation tactics." },
              { "question": "Peer Support", "answer": "We value connecting humans with similar life experiences through special interest groups and caregiver meet-ups." },
              { "question": "Collaboration and Mutuality", "answer": "Goals are selected based on the values of the child and carers. Children are treated as equals with a right to autonomy." },
              { "question": "Empowerment", "answer": "Each child’s unique strengths and special interests are used in programming to increase confidence and follow their unique learning style." },
              { "question": "Cultural & Gender Issues", "answer": "Gender-affirming language is used during all phases. Cultural differences are embraced with humility and curiosity through a diverse staff." }
            ]
          }
        }
      ],
      "root": { "props": { "title": "Trauma + ABA", "icon": "FiSun" } }
    },
    "our-space": {
      "content": [
        {
          "type": "Hero",
          "props": {
            "heading": "Our Learning Community",
            "body": "Located at 3502 Scotts Lane, our space is designed to be a safe, child-led environment for exploration and growth.",
            "heroImage": "https://static.wixstatic.com/media/dbc86f_de6659ca9aa0420fa2eb85f838637775~mv2.jpg"
          }
        }
      ],
      "root": { "props": { "title": "Our Space", "icon": "FiMap" } }
    },
    "resources": {
      "content": [
        {
          "type": "LinksList",
          "props": {
            "title": "Helpful Resources",
            "links": [
              { "label": "Foundational Reading", "url": "https://www.unfurlinglittles.com/resources" },
              { "label": "Affirming Providers", "url": "#" },
              { "label": "Community Groups", "url": "#" }
            ]
          }
        }
      ],
      "root": { "props": { "title": "Resources", "icon": "FiBook" } }
    },
    "media": {
      "content": [
        {
          "type": "Banner",
          "props": {
            "title": "Podcasts & Media",
            "body": "Hear our team discuss neurodiversity-affirming care and trauma-informed practices.",
            "bgColor": "bg-lavender-50"
          }
        }
      ],
      "root": { "props": { "title": "Media", "icon": "FiHeadphones" } }
    },
    "meet-the-team": {
      "content": [
        {
          "type": "TeamDepartment",
          "props": {
            "departmentTitle": "Operational and Administrative Core Team",
            "members": [
              { "name": "Maggie Haraburda MS LBS BCBA", "title": "Founder + Clinical Director", "slug": "maggie", "image": "https://static.wixstatic.com/media/dbc86f_82e01dfb39864228af4bf080fa630b91~mv2.jpg" },
              { "name": "Sam Henderson", "title": "Office Manager" },
              { "name": "Elizabeth Choplin MS RBT", "title": "Administrative Assistant" },
              { "name": "Jules Waldman", "title": "Administrative Director" },
              { "name": "Andrea Dohrmann", "title": "Lead Teacher" },
              { "name": "Abigail Nash", "title": "Director of Human Resources" },
              { "name": "Lauren O'Donnell", "title": "Assistant Clinical Director" }
            ]
          }
        },
        {
          "type": "TeamDepartment",
          "props": {
            "departmentTitle": "Board Certified Behavior Analysts",
            "members": [
              { "name": "Lauren Haley M.Ed. BCBA LBS CTP", "title": "BCBA + Trauma Specialist", "slug": "lauren" },
              { "name": "Julia Santa Maria MS LBS BCBA", "title": "BCBA" },
              { "name": "Allie Cooper", "title": "BCBA" },
              { "name": "Jon Helfaer", "title": "BCBA" },
              { "name": "Kelsey Buckler", "title": "BCBA" },
              { "name": "Yebin Shin", "title": "BCBA" },
              { "name": "Jude Smithey", "title": "BCBA" },
              { "name": "Natalie Ferrer", "title": "BCBA" }
            ]
          }
        },
        {
          "type": "TeamDepartment",
          "props": {
            "departmentTitle": "Mental Health Department",
            "members": [
              { "name": "Dr. Rachel Sandercock", "title": "Director of Evaluations", "slug": "rachel" },
              { "name": "Jordon Constantino", "title": "Counseling Intern", "slug": "jordon" },
              { "name": "Steph Iozzia", "title": "Counseling Intern" }
            ]
          }
        },
        {
          "type": "TeamDepartment",
          "props": {
            "departmentTitle": "Registered Behavior Technicians and Behavior Therapists",
            "members": [
              { "name": "Kyle Harris", "title": "Lead Behavior Technician", "slug": "kyle" },
              { "name": "Leah Mowery RBT", "title": "RBT" },
              { "name": "Alexseyia Mcbride", "title": "BCBA Candidate" },
              { "name": "Melodye Jemmott", "title": "Fellowship Coordinator" },
              { "name": "Ana Sosa-Ebert", "title": "Bird Caretaker" },
              { "name": "Lauren Massarella", "title": "Specialist" },
              { "name": "Alex Thode MS LBS RBT", "title": "Sensory Specialist" },
              { "name": "Sierra Nicholson", "title": "BCBA Candidate" },
              { "name": "Mar Schneider", "title": "BCBA Candidate" },
              { "name": "Rebecca Rainis", "title": "Assistant Teacher" },
              { "name": "Tahira Mackie", "title": "Staff" },
              { "name": "Raychan Abdallah", "title": "Staff" },
              { "name": "Marley Wardle RBT", "title": "BCBA Candidate" },
              { "name": "Tessa Mulders", "title": "Staff" },
              { "name": "Kayl Bothom", "title": "Staff" },
              { "name": "Caitlin Baker", "title": "Staff" },
              { "name": "Pepper Gardner", "title": "Book DJ" },
              { "name": "Ruth Long", "title": "AAC Coordinator" },
              { "name": "Ebony Edwards", "title": "After School Coordinator" },
              { "name": "Nicole Doyle", "title": "Staff" },
              { "name": "Jesse Garten", "title": "Staff" },
              { "name": "Emili Woriax", "title": "Staff" },
              { "name": "Percy Shipper", "title": "Staff" },
              { "name": "Erin McLaughlin", "title": "Staff" }
            ]
          }
        }
      ],
      "root": { "props": { "title": "Meet the Team", "icon": "FiUsers" } }
    },
    "meet-the-team/maggie": {
      "content": [
        {
          "type": "Hero",
          "props": {
            "heading": "Maggie Haraburda",
            "body": "Maggie Haraburda is an Autistic Behavior Analyst and the owner/founder of Unfurling Littles LLC as well as Clinical Director. She received her undergraduate degree from the University of Vermont and her Masters from Drexel University. Maggie founded Unfurling Littles to create a model of ABA that is child-led, trauma-informed, and neurodiverse-affirming.",
            "heroImage": "https://static.wixstatic.com/media/dbc86f_82e01dfb39864228af4bf080fa630b91~mv2.jpg"
          }
        }
      ],
      "root": { "props": { "title": "Maggie Haraburda", "icon": "FiUsers" } }
    },
    "meet-the-team/lauren": {
      "content": [
        {
          "type": "Hero",
          "props": {
            "heading": "Lauren Haley",
            "body": "Lauren is a Board Certified Behavior Analyst, Certified Trauma Professional, and Adjunct Professor at Temple University. She has a primary focus in Acceptance and Commitment Training, caregiver support, and trauma-informed behavior practices. Lauren believes in creating spaces where children can thrive as their authentic selves.",
            "heroImage": "https://static.wixstatic.com/media/dbc86f_82e01dfb39864228af4bf080fa630b91~mv2.jpg"
          }
        }
      ],
      "root": { "props": { "title": "Lauren Haley", "icon": "FiUsers" } }
    },
    "meet-the-team/rachel": {
      "content": [
        {
          "type": "Hero",
          "props": {
            "heading": "Dr. Rachel Sandercock",
            "body": "Dr. Rachel Sandercock is the Director of Evaluations at Unfurling Littles. She specializes in neurodiversity-affirming diagnostic assessments for children and adolescents, focusing on understanding each individual's unique strengths and needs.",
            "heroImage": "https://static.wixstatic.com/media/dbc86f_82e01dfb39864228af4bf080fa630b91~mv2.jpg"
          }
        }
      ],
      "root": { "props": { "title": "Dr. Rachel Sandercock", "icon": "FiUsers" } }
    },
    "meet-the-team/jordon": {
      "content": [
        {
          "type": "Hero",
          "props": {
            "heading": "Jordon Constantino",
            "body": "Jordon is a Counseling Intern at Unfurling Littles. He provides neurodiversity-affirming therapy for children and teens, supporting clients in exploring their emotions and identity through consent-based, collaborative care.",
            "heroImage": "https://static.wixstatic.com/media/dbc86f_82e01dfb39864228af4bf080fa630b91~mv2.jpg"
          }
        }
      ],
      "root": { "props": { "title": "Jordon Constantino", "icon": "FiUsers" } }
    },
    "meet-the-team/kyle": {
      "content": [
        {
          "type": "Hero",
          "props": {
            "heading": "Kyle Harris",
            "body": "Kyle is the Lead Therapist at Unfurling Littles LLC. He focuses on naturalistic developmental behavioral interventions and bringing joy, laughter, and love to every session. Family is at the forefront of his approach.",
            "heroImage": "https://static.wixstatic.com/media/dbc86f_82e01dfb39864228af4bf080fa630b91~mv2.jpg"
          }
        }
      ],
      "root": { "props": { "title": "Kyle Harris", "icon": "FiUsers" } }
    }
  } 
};
