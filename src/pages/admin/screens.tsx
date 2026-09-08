import { CollectionAdmin } from '@/components/admin/CollectionAdmin'
import {
  areasConfig,
  casesConfig,
  experienceConfig,
  publicationsConfig,
  testimonialsConfig,
} from './collections'

export const CasesAdmin = () => <CollectionAdmin config={casesConfig} />
export const AreasAdmin = () => <CollectionAdmin config={areasConfig} />
export const ExperienceAdmin = () => <CollectionAdmin config={experienceConfig} />
export const PublicationsAdmin = () => <CollectionAdmin config={publicationsConfig} />
export const TestimonialsAdmin = () => <CollectionAdmin config={testimonialsConfig} />
