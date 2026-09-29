import { CollectionAdmin } from '@/components/admin/CollectionAdmin'
import {
  areasConfig,
  experienceConfig,
  publicationsConfig,
  testimonialsConfig,
  useCasesConfig,
} from './collections'

export const CasesAdmin = () => <CollectionAdmin config={useCasesConfig()} />
export const AreasAdmin = () => <CollectionAdmin config={areasConfig} />
export const ExperienceAdmin = () => <CollectionAdmin config={experienceConfig} />
export const PublicationsAdmin = () => <CollectionAdmin config={publicationsConfig} />
export const TestimonialsAdmin = () => <CollectionAdmin config={testimonialsConfig} />
