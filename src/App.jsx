import React from 'react';
import Navbar from './components/Navbar';
import HeroScrollCanvas from './components/HeroScrollCanvas';
import TransitionBridge from './components/TransitionBridge';
import SignatureShowcase from './components/SignatureShowcase';
import EngineeringNarrative from './components/EngineeringNarrative';
import CraftsmanshipGallery from './components/CraftsmanshipGallery';
import InteractiveOrbitalViewer from './components/InteractiveOrbitalViewer';
import DesignPhilosophy from './components/DesignPhilosophy';
import CockpitExperience from './components/CockpitExperience';
import TrackTelemetry from './components/TrackTelemetry';
import CinematicMoment from './components/CinematicMoment';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#eaecee] selection:bg-red-600 selection:text-white antialiased overflow-x-hidden">
      {/* Fixed Luxury Navigation */}
      <Navbar />

      {/* Main Experience Flow */}
      <main>
        {/* Protected 3D Hero Section (Completely Intact) */}
        <HeroScrollCanvas />

        {/* Section 01 — Cinematic Transition Out of the Hero */}
        <TransitionBridge />

        {/* Section 02 — Signature Car Showcase */}
        <SignatureShowcase />

        {/* Section 03 — Performance & Engineering Story */}
        <EngineeringNarrative />

        {/* Section 04 — Automotive Detail Gallery */}
        <CraftsmanshipGallery />

        {/* Section 05 — Interactive 360° Vehicle Exploration */}
        <InteractiveOrbitalViewer />

        {/* Section 06 — Design Philosophy */}
        <DesignPhilosophy />

        {/* Section 07 — Interior & Cockpit Experience */}
        <CockpitExperience />

        {/* Section 08 — Nordschleife Track Telemetry */}
        <TrackTelemetry />

        {/* Section 09 — Immersive Full-Width Cinematic Moment */}
        <CinematicMoment />

        {/* Section 10 — Final Editorial Call to Action */}
        <FinalCTA />
      </main>

      {/* Section 11 — Premium Automotive Footer */}
      <Footer />
    </div>
  );
}
