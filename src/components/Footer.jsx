import React from 'react';
import { Github, Facebook, Mail } from "lucide-react";


const Footer = () => {
  return (
    <footer className="py-6 border-t border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm">
  <div className="max-w-6xl mx-auto px-4">
    {/* Desktop Layout - Horizontal */}
    <div className="hidden md:flex justify-between items-center">

      {/* Social Links (horizontal - left side) */}
      <div className="flex items-center space-x-4">
        {/* GitHub */}
        <a
          href="https://github.com/ngcgiang"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-2 transition-all duration-300 hover:scale-105"
        >
          <div className="p-2 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-400/30 group-hover:border-purple-300/60 transition-all duration-300">
            <Github className="w-4 h-4 text-pink-100 group-hover:text-purple-200 transition-colors duration-300" />
          </div>
          <span className="text-sm font-medium" style={{ color: '#e6c6d4' }}>@ngcgiang</span>
        </a>

        {/* Facebook */}
        <a
          href="https://facebook.com/ngcgiang"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-2 transition-all duration-300 hover:scale-105"
        >
          <div className="p-2 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-400/30 group-hover:border-purple-300/60 transition-all duration-300">
            <Facebook className="w-4 h-4 text-pink-200 group-hover:text-purple-200 transition-colors duration-300" />
          </div>
          <span className="text-sm font-medium" style={{ color: '#e6c6d4' }}>@ngcgiang</span>
        </a>

        {/* Gmail */}
        <a
          href="mailto:ngocgiang18032004@gmail.com"
          className="group flex items-center space-x-2 transition-all duration-300 hover:scale-105"
        >
          <div className="p-2 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-400/30 group-hover:border-purple-300/60 transition-all duration-300">
            <Mail className="w-4 h-4 text-purple-200 group-hover:text-pink-200 transition-colors duration-300" />
          </div>
          <span className="text-sm font-medium" style={{ color: '#e6c6d4' }}>ngocgiang18032004@gmail.com</span>
        </a>
      </div>

      {/* Copyright + Attribution (right side) */}
      <div className="flex items-center space-x-4 text-right">
        <p className="text-sm" style={{ color: '#e6c6d4' }}>
          Made with 💜 by <span className="font-semibold" style={{ color: '#a65e9e' }}>ngcjang</span>
        </p>
        <span className="text-sm" style={{ color: '#704b91' }}>•</span>
        <p className="text-xs" style={{ color: '#704b91' }}>
          © 2025 Bouquet Web3. Spreading beauty, one flower at a time. 🌸
        </p>
      </div>

    </div>

    {/* Mobile Layout - Vertical */}
    <div className="md:hidden flex flex-col items-center space-y-3">

      {/* Social Links (horizontal - mobile) */}
      <div className="flex items-center space-x-6">
        {/* GitHub */}
        <a
          href="https://github.com/ngcgiang"
          target="_blank"
          rel="noopener noreferrer"
          className="group transition-all duration-300 hover:scale-105"
          title="GitHub: @ngcgiang"
        >
          <div className="p-2 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-400/30 group-hover:border-purple-300/60 transition-all duration-300">
            <Github className="w-4 h-4 text-pink-100 group-hover:text-purple-200 transition-colors duration-300" />
          </div>
        </a>

        {/* Facebook */}
        <a
          href="https://facebook.com/ngcgiang"
          target="_blank"
          rel="noopener noreferrer"
          className="group transition-all duration-300 hover:scale-105"
          title="Facebook: @ngcgiang"
        >
          <div className="p-2 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-400/30 group-hover:border-purple-300/60 transition-all duration-300">
            <Facebook className="w-4 h-4 text-pink-200 group-hover:text-purple-200 transition-colors duration-300" />
          </div>
        </a>

        {/* Gmail */}
        <a
          href="mailto:ngocgiang18032004@gmail.com"
          className="group transition-all duration-300 hover:scale-105"
          title="Email: ngocgiang18032004@gmail.com"
        >
          <div className="p-2 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-400/30 group-hover:border-purple-300/60 transition-all duration-300">
            <Mail className="w-4 h-4 text-purple-200 group-hover:text-pink-200 transition-colors duration-300" />
          </div>
        </a>
      </div>

      {/* Copyright + Attribution (centered - mobile) */}
      <div className="flex flex-col items-center space-y-1 text-center">
        <p className="text-sm" style={{ color: '#e6c6d4' }}>
          Made with 💜 by <span className="font-semibold" style={{ color: '#a65e9e' }}>ngcjang</span>
        </p>
        <p className="text-xs" style={{ color: '#704b91' }}>
          © 2025 Bouquet Web3. Spreading beauty, one flower at a time. 🌸
        </p>
      </div>

    </div>
  </div>
</footer>
  );
};

export default Footer;