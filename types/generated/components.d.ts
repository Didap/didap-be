import type { Schema, Struct } from '@strapi/strapi';

export interface ProjectAbility extends Struct.ComponentSchema {
  collectionName: 'components_project_abilities';
  info: {
    description: 'Project technical or functional ability';
    displayName: 'Ability';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'project.ability': ProjectAbility;
    }
  }
}
