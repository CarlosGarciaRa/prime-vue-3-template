import authRoutes from './auth';
import programmingLanguagesRoutes from './programmingLanguages';
import profileRoutes from './profile';
import skillsRoutes from './skills';
import ProjectsRoutes from './projects';

export const routes = [...authRoutes, ...programmingLanguagesRoutes, ...profileRoutes, ...skillsRoutes, ...ProjectsRoutes];
