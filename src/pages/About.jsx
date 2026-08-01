import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, ShieldCheck, Award, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import Breadcrumbs from '../components/Breadcrumbs';

export default function About() {
  useSEO({
    title: 'About Rc Flight Zone | Our Engineering Legacy',
    description: 'Learn about Rc Flight Zone, our aerospace engineering team, and our mission to make RC flight accessible, safe, and enjoyable for everyone.'
  });

  return (
    <div className="space-y-12 pb-16">
      <Breadcrumbs items={[{ name: 'About Us', url: '/about' }]} />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">Engineering Confidence In Flight</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900">The Story Behind Rc Flight Zone</h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Founded by aeronautical engineers and veteran AMA flight instructors, Rc Flight Zone was created to solve one simple problem: eliminating the fear of crashing for new RC pilots.
        </p>
      </section>

      {/* Brand Values Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs space-y-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto font-bold">
            <Plane className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">Inherent Stability</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Our airframe geometries feature self-righting dihedral wings and high drag-to-lift safety margins.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs space-y-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">Smart Gyro Guidance</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Every VT-Simple Trainer comes integrated with our proprietary 6-Axis MEMS flight stabilization board.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs space-y-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">Quality Assurance</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Every motor, ESC, servo, and airframe undergoes rigorous 10-point factory flight bench testing before boxing.
          </p>
        </div>
      </section>

      {/* Feature Showcase Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1F3A5F] text-white rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-semibold text-blue-300 uppercase tracking-widest">Our Mission</span>
            <h2 className="text-2xl sm:text-3xl font-bold">Empowering The Next Generation Of Pilots</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We believe that the joy of radio-controlled aviation should be accessible to everyone—from young students discovering physics to adults realizing a lifelong aviation dream. We manufacture our aircraft with extreme precision so that your very first day at the flying field is a success story.
            </p>
            <div className="pt-2">
              <Link
                to="/product/vt-simple-trainer-rtf"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] hover:bg-blue-600 text-white text-xs font-semibold rounded-xl transition"
              >
                <span>Discover VT-Simple Trainer</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-700">
            <img
              src="/src/assets/images/vt_trainer_action_1784882915807.jpg"
              alt="Rc Flight Zone Hangar"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
