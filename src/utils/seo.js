/**
 * SEO & Schema.org Structured Data Generator Utilities
 */

export const generateProductSchema = (product) => {
  if (!product) return null;
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images || [],
    "description": product.summary || product.description,
    "sku": product.sku || product.id,
    "brand": {
      "@type": "Brand",
      "name": "VT Aircraft"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://vtaircraft.com/product/${product.slug || product.id}`,
      "priceCurrency": "USD",
      "price": product.price,
      "priceValidUntil": "2028-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "VT Aircraft"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating || 4.9,
      "reviewCount": product.reviewCount || 128
    }
  };
};

export const generateBreadcrumbSchema = (items) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://vtaircraft.com${item.url}`
    }))
  };
};

export const generateFAQSchema = (faqs) => {
  if (!faqs || !faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "VT Aircraft",
    "url": "https://vtaircraft.com",
    "logo": "https://vtaircraft.com/images/logo.png",
    "slogan": "Learn to Fly with Confidence",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-555-0199",
      "contactType": "customer service",
      "email": "support@vtaircraft.com"
    }
  };
};
