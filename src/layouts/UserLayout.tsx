import React from 'react';
import BasicLayout from './BasicLayout';
import Footer from '@/components/Footer';
import styles from './UserLayout.less';

const UserLayout: React.FC<any> = ({ children, location, route }) => {
  const pathname = location.pathname;
  const routes = route.routes;
  const currentRoute = routes.filter((e: { path: string; }) => e.path === pathname);
  const title = currentRoute.length && currentRoute[0]['title'];
  return (
    <BasicLayout>
      <div className={styles.continer}>
        <header>
          <h1 className={styles.title}>{title}</h1>
        </header>
        <section>{children}</section>
        <Footer />
      </div>
    </BasicLayout>
  );
}

export default UserLayout;
