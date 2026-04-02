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
            "title": "Trauma-Informed Care",
            "body": "At Unfurling Littles LLC we provide trauma informed care.\n\nWhat is Trauma?\nTrauma happens when an event creates a feeling of being unsafe or helpless. It can come from experiencing a situation personally, seeing someone else go through it, or being affected by a loved one's trauma. When traumatic experiences happen in childhood, they’re called adverse childhood experiences (ACEs). What’s important to know is that it’s not just the experience itself that matters; it’s how a person is able to cope with it. Trauma affects people differently—what’s no big deal to one person can be life changing for someone else.",
            "bgColor": "bg-white"
          }
        },
        {
          "type": "Banner",
          "props": {
            "title": "Neurodivergence and Trauma",
            "body": "It's estimated that over 70% of people around the world will go through at least one traumatic event in their lives, and about 31% will face four or more. Research shows that people who are Autistic or otherwise neurodivergent are 1.5 to 3 times more likely than others to experience mistreatment that leads to trauma. For neurodivergent children, things like sensory overload, bullying, social isolation, and differences in communication and self-advocacy can lead to increased susceptibility to trauma compared to their neurotypical peers. The science of behavior analysis is a powerful therapeutic tool that has historically been misused, leading to neurodivergent children being taught to mask their true selves in order to belong. Many Autistic adults who participated in Applied Behavior Analysis (ABA) as children have spoken out against the field sharing their “therapy” resulted in trauma.",
            "bgColor": "bg-sage-100"
          }
        },
        {
          "type": "Banner",
          "props": {
            "title": "The Impact of Trauma on the Body",
            "body": "When we face stressful situations, our bodies release two key stress hormones: cortisol and adrenaline. These hormones help us stay safe during dangerous times, but if they stay elevated for too long, they can cause a range of long-term issues, including: Anxiety, Depression, Digestive problems, Headaches, Muscle tension and pain, Heart issues like heart disease, heart attacks, high blood pressure, and strokes, Sleep problems, Weight gain, Trouble with memory and focus.\n\nStudies show that having a caring, supportive person in your life is one thing that can help lessen the impact of traumatic events.",
            "bgColor": "bg-white"
          }
        },
        {
          "type": "Banner",
          "props": {
            "title": "Assumptions of Trauma-Informed Care",
            "body": "Neurodivergent kids are more likely to experience at least one adverse childhood event (ACE) and may perceive and process these events differently from their neurotypical peers. At Unfurling Littles, we approach ABA programming with a trauma-informed perspective. This means that regardless of a child’s past experiences or what has been reported, all of our interventions are designed with the awareness that trauma could be a factor.\n\nSo, what does a Trauma-Informed Approach involve? It’s rooted in four key assumptions:\n\nRealization - Understanding how trauma impacts individuals, families, and communities, and recognizing how it may impact mental health and impede positive outcomes\nRecognition - Identifying signs of trauma through methods like screening, assessment, and supervision\nResponse - Applying trauma-informed principles across the organization—this means adapting policies, procedures, staffing, and culture to create a safer, more supportive environment\nResisting Re-Traumatization - Being aware of how policies, practices, and interventions might unintentionally trigger or worsen traumatic experiences for both staff and clients, and working to avoid this",
            "bgColor": "bg-lavender-100"
          }
        },
        {
          "type": "FAQ",
          "props": {
            "title": "How We Apply TIC at Unfurling Littles",
            "items": [
              { "question": "Safety", "answer": "Therapeutic spaces offer non-contingent sensory accommodations (e.g., lights off, noise canceling headphones, shoes off, access to sensory toys, “crash” spaces, etc.). Therapeutic spaces are set up as “yes” spaces to increase safety and decrease the likelihood behavior correction is needed. Physical interventions are not used under any circumstance, unless the child is in imminent physical danger. All signs of assent withdrawal (i.e., spoken or unspoken) are always honored. Self-Advocacy is a goal for all clients, to increase the likelihood they will have the skills needed to stay safe in social interactions with familiar and unfamiliar people." },
              { "question": "Trustworthiness and Transparency", "answer": "Interventions are never done “to” a child without the child being aware. When a decision needs to be made in session, it is labeled for the child with age-appropriate rationale. Therapists are honest in their interactions with clients, and do not use manipulation tactics to increase compliance. Unfurling Littles solicits feedback from caregivers, clients, and staff to informed organizational decision making." },
              { "question": "Peer Support", "answer": "Unfurling Littles values connecting humans with other humans who are having a similar life experience. Special interests groups are available to autistic children who share similar values with one another. With consent, Unfurling Littles connects families to one another who are receiving services from Unfurling Littles through caregiver meet-ups and virtual support groups. A dedicated peer support specialist who is an individual with experience and expertise in neurodiversity affirming ABA who provides support, guidance, and assistance to other staff members." },
              { "question": "Collaboration and Mutuality", "answer": "All goals are selected based on the values of the child and their carers. Children are treated as equals with a right to autonomy and respect. Feedback on programming is solicited on an ongoing basis to ensure that all stakeholders are in alignment with the goals and strategies." },
              { "question": "Empowerment", "answer": "Programming centers the values of the child and family above all else. Special interests of the child are welcomed and incorporated into sessions. Each child’s unique strengths are used in programming to ensure that they are being taught in the way they learner, and to increase confidence in themselves." },
              { "question": "Cultural, Historical, and Gender Issues", "answer": "Gender-affirming language is used during all phases of ABA support. Cultural differences are embraced with humility and curiosity. Unfurling Littles believes in have a diverse staff or varied races, genders, neurotypes, and walks of life." }
            ]
          }
        },
        {
          "type": "Banner",
          "props": {
            "title": "A Framework for Care",
            "body": "We believe that Trauma-Informed Care is not a destination to be reached, but a decision-making framework with which to base all supportive programming.",
            "bgColor": "bg-gold-100"
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
            "heading": "Our Space",
            "body": "Our space is designed to feel like a second home; bright, cozy, and filled with opportunities for curiosity and connection. Every corner is intentionally created to honor children’s voices, nurture play, and invite exploration.",
            "heroImage": "https://static.wixstatic.com/media/dbc86f_de6659ca9aa0420fa2eb85f838637775~mv2.jpg"
          }
        },
        {
          "type": "Banner",
          "props": {
            "title": "A Shared Community",
            "body": "Unlike many clinical settings, we intentionally chose a space without separate rooms. This open design increases visibility, fosters safety, and encourages a sense of togetherness; reminding children and families that they are part of a shared community.",
            "bgColor": "bg-sage-100"
          }
        },
        {
          "type": "Banner",
          "props": {
            "title": "Inspired Learning",
            "body": "Our main play and therapy room is set up with open-ended materials inspired by Reggio Emilia, Montessori, and Waldorf philosophies, so children can follow their own interests and spark new discoveries. Natural light, soft seating, and creative nooks make the environment feel welcoming for both learning and rest.",
            "bgColor": "bg-white"
          }
        },
        {
          "type": "Banner",
          "props": {
            "title": "For Families Too",
            "body": "Families are part of our community too. We offer a comfortable lounge area where caregivers can work, relax, or connect with one another while children are in session. For group programs, parents may choose to drop off or stay onsite; our space is flexible to meet everyone’s comfort level.",
            "bgColor": "bg-sage-100"
          }
        },
        {
          "type": "Banner",
          "props": {
            "title": "Our Philosophy in Practice",
            "body": "Whether a child is here for therapy, a connection group, or a community event, our space reflects our philosophy: connection, not compliance; joy, not pressure. It’s a place where children and families can unfurl, grow, and belong.\n\n3502 Scotts Lane Suite 404, Philadelphia PA 19129",
            "bgColor": "bg-white"
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
