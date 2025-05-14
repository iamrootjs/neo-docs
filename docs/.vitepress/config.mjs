import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid({
  title: "Tech Accelerator - Neo",
  description: "Documentation Description",
  appearance: "dark",
  base: "/neo-docs/",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Product Requirements", link: "/prd/" },
      { text: "Technical Requirements", link: "/trd/" },
      {
        text: "API Documentation",
        link: "#",
      },
    ],
    clearUrls: true,
    sidebar: {
      "/prd/": [
        {
          text: "Product Requirements",
          items: [
            { text: "Executive Summary", link: "/prd/executive-summary" },
            { text: "Business Objectives", link: "/prd/business-objectives" },
            { text: "Stakeholders", link: "/prd/stakeholders" },
            { text: "User Personas", link: "/prd/user-personas" },
            { text: "Scope", link: "/prd/scope" },
            { text: "Functional Requirements", link: "/prd/functional-requirements" },
            { text: "Non-Functional Requirements", link: "/prd/non-functional-requirements" },
            { text: "Success Metrics", link: "/prd/success-metrics" },
            { text: "Risks and Mitigations", link: "/prd/risks-and-mitigations" },
            { text: "Timeline", link: "/prd/timeline" },
            { text: "Appendices", items: [
              { text: "Glossary", link: "/prd/appendices/glossary" }
            ]}
          ],
        },
      ],
      "/trd/": [
        {
          text: "1. Introduction",
          items: [
            { text: "1.1 Purpose", link: "/trd/introduction-purpose" },
            { text: "1.2 Scope", link: "/trd/introduction-scope" },
            { text: "1.3 Definitions and Acronyms", link: "/trd/introduction-definitions-acronyms" },
          ],
        },
        {
          text: "2. Architecture Constraints",
          link: "/trd/architecture-constraints",
        },
        {
          text: "3. Quality Goals",
          link: "/trd/quality-goals",
        },
        {
          text: "4. Stakeholders",
          link: "/trd/stakeholders",
        },
        {
          text: "5. System Scope and Context",
          items: [
            { text: "5.1 Business Context", link: "/trd/system-scope-business-context" },
            { text: "5.2 Technical Context", link: "/trd/system-scope-technical-context" },
          ],
        },
        {
          text: "6. Solution Strategy",
          link: "/trd/solution-strategy",
        },
        {
          text: "7. Building Block View",
          items: [
            { text: "7.1 Context Level", link: "/trd/context-level" },
            { text: "7.2 Container Level", link: "/trd/container-level" },
            { text: "7.3 Component Diagram", link: "/trd/building-block-component-diagram" },
            { text: "7.4 Front-end Layer", link: "/trd/front-end-layer-component" },
            { text: "7.5 Back-end Layer", link: "/trd/back-end-layer-component" },
            { text: "7.6 Data Layer", link: "/trd/data-layer-component" },
          ],
        },
        {
          text: "8. Runtime View",
          items: [
            { text: "8.1 Message Processing Flow", link: "/trd/runtime-view-feedback-submission" },
            { text: "8.2 General Runtime View", link: "/trd/runtime-view" },
          ],
        },
        {
          text: "9. Deployment View",
          link: "/trd/deployment-view",
        },
        {
          text: "10. External Interface Requirements",
          link: "/trd/external-interface-requirements",
        },
        {
          text: "11. Architectural Decisions",
          link: "/trd/architechtural-decisions",
        },
        {
          text: "12. Design Decisions",
          link: "/trd/design-decisions",
        },
        {
          text: "13. Risks and Technical Debts",
          link: "/trd/risks-technical-debts",
        },
        {
          text: "14. Timeline",
          link: "/trd/timeline",
        },
        {
          text: "15. Technical Requirements",
          link: "/trd/technical-requirements",
        },
        {
          text: "16. Appendices",
          items: [
            { text: "16.1 Glossary", link: "/trd/appendices-glossary" },
            { text: "16.2 C4 Diagrams", link: "/trd/appendices-c4-diagrams" },
            { text: "16.3 Entity Relationship Diagram", link: "/trd/entity-relationship-diagram" },
            { text: "16.4 Cloud Infrastructure", link: "/trd/cloud-infrastructure" },
          ],
        },
      ],
    },
    appearance: "dark",
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/iamrootjs/neo-docs",
      },
    ],
    search: {
      provider: 'local'
    },
  },
  // Mermaid plugin config
  mermaid: {
    // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
  },
  mermaidPlugin: {
    class: "mermaid my-class", // set additional css classes for parent container 
  },
});
