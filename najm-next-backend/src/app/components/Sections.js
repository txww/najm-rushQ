'use client';

import { useState, useMemo, useEffect } from 'react';
import Hero from '../components/Hero';
import ServicesHeroStyle from '../components/ServicesHeroStyle';
import ProjectsHeroStyle from '../components/ProjectsHeroStyle';
import StartUs from '../components/StartUs';
import SectionCard from '../components/SectionCard';
import { getMaterialsSummary } from '../data/materials-summary';

export default function Sections() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const normalized = searchTerm.trim().toLowerCase();

  useEffect(() => {
    getMaterialsSummary()
      .then(setMaterials)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!normalized) return materials;

    return materials.filter(
      (m) =>
        (m.name || '').toLowerCase().includes(normalized) ||
        (m.description || '').toLowerCase().includes(normalized)
    );
  }, [materials, normalized]);

  if (loading) return <div>Loading sections...</div>;

  return (
    <>
      <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <ServicesHeroStyle id="services" />

      <ProjectsHeroStyle />

      <StartUs />

      <section
        id="sections"
        className="p-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {filtered.length > 0 ? (
          filtered.map((item) => <SectionCard key={item.id} {...item} />)
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            لا توجد نتائج لكلمة البحث "{searchTerm}"
          </p>
        )}
      </section>
    </>
  );
}
