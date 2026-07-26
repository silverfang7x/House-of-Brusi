'use client';

import React from 'react';
import { Sheet } from '@/components/ui/sheet';

interface SizeGuideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SizeGuideDrawer({ isOpen, onClose }: SizeGuideDrawerProps) {
  return (
    <Sheet isOpen={isOpen} onClose={onClose} title="Sizing & Fit Atelier Guide">
      <div className="space-y-8 font-body text-ink">
        {/* Fit Philosophy Note */}
        <div className="p-4 bg-ink/5 border-l-2 border-brass rounded-r-sm">
          <h3 className="font-display text-base font-semibold text-ink">
            Atelier Fit Philosophy
          </h3>
          <p className="mt-2 text-xs text-ink/80 leading-relaxed">
            House of Brusi garments feature traditional tailored shoulders with a relaxed, architectural fall through the torso and waist. If you prefer a sculpted silhouette, we recommend sizing down. All selvedge denim and raw linen will ease 0.5 inches after initial wear.
          </p>
        </div>

        {/* Tops Measurement Table */}
        <div>
          <h3 className="font-display text-base font-semibold text-saddle mb-3">
            Tops, Jackets & Smocks (Inches)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border border-dust/30">
              <thead className="bg-ink text-bone">
                <tr>
                  <th className="p-2.5">Size</th>
                  <th className="p-2.5">Bust</th>
                  <th className="p-2.5">Waist</th>
                  <th className="p-2.5">Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dust/20 bg-bone">
                <tr>
                  <td className="p-2.5 font-bold">XS</td>
                  <td className="p-2.5">32 - 34&quot;</td>
                  <td className="p-2.5">25 - 26&quot;</td>
                  <td className="p-2.5">26.5&quot;</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">S</td>
                  <td className="p-2.5">35 - 36&quot;</td>
                  <td className="p-2.5">27 - 28&quot;</td>
                  <td className="p-2.5">27.0&quot;</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">M</td>
                  <td className="p-2.5">37 - 39&quot;</td>
                  <td className="p-2.5">29 - 30&quot;</td>
                  <td className="p-2.5">27.5&quot;</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">L</td>
                  <td className="p-2.5">40 - 42&quot;</td>
                  <td className="p-2.5">31 - 33&quot;</td>
                  <td className="p-2.5">28.0&quot;</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">XL</td>
                  <td className="p-2.5">43 - 45&quot;</td>
                  <td className="p-2.5">34 - 36&quot;</td>
                  <td className="p-2.5">28.5&quot;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottoms Measurement Table */}
        <div>
          <h3 className="font-display text-base font-semibold text-saddle mb-3">
            Trousers & Riding Pants (Inches)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border border-dust/30">
              <thead className="bg-ink text-bone">
                <tr>
                  <th className="p-2.5">Size</th>
                  <th className="p-2.5">Waist</th>
                  <th className="p-2.5">Hip</th>
                  <th className="p-2.5">Inseam</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dust/20 bg-bone">
                <tr>
                  <td className="p-2.5 font-bold">XS</td>
                  <td className="p-2.5">25 - 26&quot;</td>
                  <td className="p-2.5">35 - 36&quot;</td>
                  <td className="p-2.5">30.0&quot;</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">S</td>
                  <td className="p-2.5">27 - 28&quot;</td>
                  <td className="p-2.5">37 - 38&quot;</td>
                  <td className="p-2.5">30.5&quot;</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">M</td>
                  <td className="p-2.5">29 - 30&quot;</td>
                  <td className="p-2.5">39 - 40&quot;</td>
                  <td className="p-2.5">31.0&quot;</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">L</td>
                  <td className="p-2.5">31 - 33&quot;</td>
                  <td className="p-2.5">41 - 43&quot;</td>
                  <td className="p-2.5">31.5&quot;</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">XL</td>
                  <td className="p-2.5">34 - 36&quot;</td>
                  <td className="p-2.5">44 - 46&quot;</td>
                  <td className="p-2.5">32.0&quot;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* How to Measure Instructions */}
        <div className="space-y-3 border-t border-dust/30 pt-6">
          <h4 className="font-display text-sm font-semibold text-ink uppercase tracking-wider">
            How to Measure
          </h4>
          <ul className="space-y-2 text-xs text-dust leading-relaxed list-disc pl-4">
            <li>
              <strong>Bust:</strong> Measure around the fullest part of your chest with tape relaxed under arms.
            </li>
            <li>
              <strong>Waist:</strong> Measure at your natural waistline, keeping tape comfortably loose.
            </li>
            <li>
              <strong>Hip:</strong> Stand with feet together and measure around the fullest point of hips.
            </li>
            <li>
              <strong>Inseam:</strong> Measure from crotch seam straight down to bottom ankle hem.
            </li>
          </ul>
        </div>
      </div>
    </Sheet>
  );
}
