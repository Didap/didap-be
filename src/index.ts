// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const projectsCount = await strapi.db.query('api::project.project').count()

    if (projectsCount === 0) {
      const realProjects = [
        {
          name: 'Coltivatori di Emozioni',
          category: 'web',
          year: 2023,
          month: 1,
          link: 'https://coltivatoridiemozioni.com/',
          description:
            "Il concetto fondamentale di Coltivatori di Emozioni è quello dell'adozione di un agricoltore. Gli utenti possono scegliere un agricoltore che rispecchia i propri interessi e valori, e stabilire un legame diretto con lui.",
          rarity: 'ultra',
          element_type: 'grass',
          tech_stack: ['HTML', 'CSS', 'Javascript', 'PHP', 'Adobe Illustrator', 'Figma'],
          abilities: [
            { name: 'Social Farming Core', description: 'Algoritmo proprietario per il matching tra donatori e agricoltori locali.' },
            { name: 'Heritage Guard', description: 'Sistema di tracciamento blockchain per la salvaguardia dei prodotti tipici.' }
          ],
          publishedAt: new Date(),
        },
        {
          name: 'Tonus Tech',
          category: 'app',
          year: 2024,
          month: 5,
          link: 'https://tonus.tech/',
          description:
            'Tonus è un wearable intelligente che migliora la tua longevità atletica ottimizzando le tue sessioni fitness con algoritmi di analisi avanzati.',
          rarity: 'ultra',
          element_type: 'electric',
          tech_stack: ['Angular', 'NodeJS', 'MongoDB', 'SCSS', 'Adobe Illustrator', 'Figma'],
          abilities: [
            { name: 'V-PRO AI Engine', description: 'Analisi biometrica in tempo reale con feedback aptico per la correzione della postura.' },
            { name: 'Hyper-Sync', description: 'Sincronizzazione multi-dispositivo a bassissima latenza via Bluetooth 5.3.' }
          ],
          publishedAt: new Date(),
        },
        {
          name: 'Yacht In Puglia',
          category: 'web',
          year: 2024,
          month: 7,
          link: 'https://yachtinpuglia.com/',
          description:
            'Yacht In Puglia è un sito di prenotazione e gestione di un Catamarano di Lusso. Offre una gamma di servizi completi per soddisfare le esigenze di viaggio di ogni cliente.',
          rarity: 'rare',
          element_type: 'water',
          tech_stack: ['HTML', 'CSS', 'Javascript', 'PHP', 'Adobe Illustrator', 'Figma'],
          abilities: [
            { name: 'Dynamic Booking', description: 'Gestione calendari in tempo reale per flotta lusso e equipaggi.' }
          ],
          publishedAt: new Date(),
        },
        {
          name: 'Cetma',
          category: 'web',
          year: 2023,
          month: 3,
          link: 'https://cetma.it/',
          description:
            "CETMA è un'organizzazione di Ricerca e Tecnologia. Il portale web è orientato a fornire informazioni dell'azienda ai clienti, raccogliere contatti, gestire corsi di formazione.",
          rarity: 'rare',
          element_type: 'psychic',
          tech_stack: ['HTML', 'CSS', 'Javascript', 'PHP', 'Adobe Illustrator', 'Figma'],
          abilities: [
            { name: 'Research Portal', description: 'Accessibilità avanzata per la consultazione di dataset scientifici complessi.' }
          ],
          publishedAt: new Date(),
        },
        {
          name: 'Fleet Manager',
          category: 'app',
          year: 2024,
          month: 4,
          link: 'https://didap.it/fleet',
          description:
            'Fleet è un gestionale di auto progettato per semplificare e automatizzare la gestione delle attività relative all’industria automobilistica in modo efficiente ed efficace.',
          rarity: 'common',
          element_type: 'steel',
          tech_stack: ['Angular', 'NodeJS', 'MongoDB', 'SCSS'],
          abilities: [
            { name: 'Automated Logs', description: 'Generazione automatica di car-logs e reportistica su consumi ed emissioni.' }
          ],
          publishedAt: new Date(),
        },
        {
          name: 'Studio Faldetta',
          category: 'web',
          year: 2023,
          month: 6,
          link: 'https://studiofaldetta.it/',
          description:
            'Sito professionale per uno studio dentistico che permette di contattare i medici direttamente tramite form o WhatsApp, descrivendo i servizi offerti.',
          rarity: 'common',
          element_type: 'psychic',
          tech_stack: ['HTML', 'CSS', 'Javascript', 'PHP', 'Adobe Illustrator', 'Figma'],
          abilities: [
            { name: 'Patient Link', description: 'Sistema di prenotazione integrato con le API di messaggistica istantanea.' }
          ],
          publishedAt: new Date(),
        },
        {
          name: 'Ditne',
          category: 'branding',
          year: 2023,
          month: 9,
          link: 'https://ditne.it/',
          description:
            "Identità visiva del Distretto Tecnologico Nazionale sull'Energia per rafforzare la competitività del settore energetico-ambientale.",
          rarity: 'rare',
          element_type: 'fire',
          tech_stack: ['Adobe Illustrator', 'Figma'],
          abilities: [
            { name: 'Visual Aura', description: 'Brand manual completo con linee guida per la comunicazione istituzionale energetica.' }
          ],
          publishedAt: new Date(),
        },
      ]

      for (const projectData of realProjects) {
        try {
          const stackIds = []
          for (const stackName of projectData.tech_stack) {
            let stackEntry = await strapi.db.query('api::stack.stack').findOne({ where: { name: stackName } })
            if (!stackEntry) {
              stackEntry = await strapi.entityService.create('api::stack.stack', { data: { name: stackName } })
            }
            stackIds.push(stackEntry.id)
          }

          const { tech_stack, ...rest } = projectData
          const dataToInsert = { ...rest, stacks: stackIds }

          await strapi.entityService.create('api::project.project', {
            data: dataToInsert,
          })
        } catch (err) {
          console.error(`Failed to seed project ${projectData.name}:`, err.message)
        }
      }

      // Seed global toolkit skills
      const globalSkills = [
        'Vue 3',
        'TypeScript',
        'Node.js',
        'Strapi CMS',
        'GSAP Animation',
        'Tailwind CSS',
        'PostgreSQL',
        'UI/UX Design',
        'Cloud Deployment',
      ]

      for (const skillName of globalSkills) {
        try {
          const exists = await strapi.db.query('api::stack.stack').findOne({ where: { name: skillName } })
          if (!exists) {
            await strapi.entityService.create('api::stack.stack', {
              data: { name: skillName, publishedAt: new Date() },
            })
          }
        } catch (err) {
          console.error(`Failed to seed global skill ${skillName}:`, err.message)
        }
      }
    }

    // Grant public permissions programmatically
    try {
      const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      })

      if (publicRole) {
        const actions = [
          'api::project.project.find',
          'api::project.project.findOne',
          'api::stack.stack.find',
          'api::stack.stack.findOne',
        ]

        for (const action of actions) {
          const existingPermission = await strapi.db.query('plugin::users-permissions.permission').findOne({
            where: {
              role: publicRole.id,
              action: action,
            },
          })

          if (!existingPermission) {
            await strapi.db.query('plugin::users-permissions.permission').create({
              data: {
                role: publicRole.id,
                action: action,
              },
            })
          }
        }
      }
    } catch (err) {
      console.error('Failed to grant public permissions:', err.message)
    }
  },
};
