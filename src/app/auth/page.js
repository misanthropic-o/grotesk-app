import "./auth.css";
import { getHeroImages } from "../mainPage/heroImages";
import PageHeader from "../mainPage/PageHeader";
import Breadcrumbs from "../breadcrumbs";
import AuthBackground from "./AuthBackground";
import AuthCard from "./AuthCard";

export default async function AuthPage() {
  const heroImages = await getHeroImages();

  return (
    <div className="auth-page">
      <AuthBackground images={heroImages} />
      <PageHeader />
      <Breadcrumbs />
      <main className="auth-page-content">
        <AuthCard />
      </main>
    </div>
  );
}
