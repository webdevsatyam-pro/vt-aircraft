import { useEffect } from 'react';

/**
 * Custom Hook for Dynamic SEO Title, Description, Open Graph, Twitter Tags & Structured Data
 */
export function useSEO({ title, description, image, canonical, jsonLd }) {
  useEffect(() => {
    const siteTitle = 'Rc Flight Zone | Learn to Fly with Confidence';
    const finalTitle = title ? `${title} | Rc Flight Zone` : siteTitle;
    document.title = finalTitle;

    const metaDescription = description || 'Rc Flight Zone - Home of the VT-Simple Trainer. Premium RC Aircraft designed for beginner & enthusiast pilots. Built with VT-Stabilize 6-axis gyro technology.';
    const metaImage = image || 'https://rcflightzone.com/images/vt_trainer_hero.jpg';
    const currentUrl = canonical || window.location.href;

    // Helper to update or create meta tag
    const updateMetaTag = (selector, attr, attrName, content) => {
      let element = document.querySelector(`meta[${attr}="${attrName}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, attrName);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Meta
    updateMetaTag('name', 'name', 'description', metaDescription);

    // Open Graph
    updateMetaTag('property', 'property', 'og:title', finalTitle);
    updateMetaTag('property', 'property', 'og:description', metaDescription);
    updateMetaTag('property', 'property', 'og:image', metaImage);
    updateMetaTag('property', 'property', 'og:url', currentUrl);
    updateMetaTag('property', 'property', 'og:type', 'website');

    // Twitter Card
    updateMetaTag('name', 'name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'name', 'twitter:title', finalTitle);
    updateMetaTag('name', 'name', 'twitter:description', metaDescription);
    updateMetaTag('name', 'name', 'twitter:image', metaImage);

    // Canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', currentUrl);

    // Structured Data (JSON-LD)
    let scriptJsonLd = document.querySelector('script[id="json-ld-schema"]');
    if (jsonLd) {
      if (!scriptJsonLd) {
        scriptJsonLd = document.createElement('script');
        scriptJsonLd.setAttribute('id', 'json-ld-schema');
        scriptJsonLd.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptJsonLd);
      }
      scriptJsonLd.textContent = JSON.stringify(jsonLd);
    } else if (scriptJsonLd) {
      scriptJsonLd.remove();
    }
  }, [title, description, image, canonical, jsonLd]);
}
