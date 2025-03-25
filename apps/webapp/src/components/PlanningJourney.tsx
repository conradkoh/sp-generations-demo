'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import Image from 'next/image';
import WhatsAppButton from '@/components/WhatsAppButton';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type InvestmentPreference = 'Minimal' | 'Balanced' | 'Comprehensive';

interface UserProfile {
  age: number;
  monthlyIncome: number;
  expenditureRatio: number;
  investmentPreference: InvestmentPreference;
}

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

const lifeStageOptions = [
  {
    value: 'Wealth Building',
    label: 'Wealth Building Phase',
    description: 'Age 20-40',
    icon: '🌱',
    details: 'Focus on building strong financial foundation',
  },
  {
    value: 'Wealth Acceleration',
    label: 'Wealth Acceleration Phase',
    description: 'Age 41-55',
    icon: '🚀',
    details: 'Focus on maximizing wealth accumulation',
  },
  {
    value: 'Legacy Planning',
    label: 'Legacy Planning Phase',
    description: 'Age 56+',
    icon: '👑',
    details: 'Focus on wealth distribution and preservation',
  },
];

const productTrackOptions = [
  {
    value: 'Essential',
    label: 'Essential Track',
    description: 'Core coverage offering',
    icon: '🛡️',
    details: 'Core protection and essential savings',
  },
  {
    value: 'Preferred',
    label: 'Preferred Track',
    description: 'Enhanced coverage offering',
    icon: '⭐',
    details: 'Enhanced protection with wealth accumulation',
  },
  {
    value: 'Prestige',
    label: 'Prestige Track',
    description: 'Premium coverage offering',
    icon: '💎',
    details: 'Comprehensive coverage with sophisticated planning',
  },
];

// Investment Preference configuration with descriptions
const PREFERENCE_CONFIG: Record<
  InvestmentPreference,
  {
    title: string;
    description: string;
    protectionRatio: number;
    wealthRatio: number;
    legacyRatio: number;
    comment: string;
    totalRatio: number;
  }
> = {
  Minimal: {
    title: 'Essential Protection',
    description: 'Focus on essential protection (10% of fluid cash)',
    protectionRatio: 0.07, // 7% of fluid income
    wealthRatio: 0.02, // 2% to wealth building
    legacyRatio: 0.01, // 1% to legacy
    comment: 'Prioritizes basic health and life protection',
    totalRatio: 0.1, // 10% total
  },
  Balanced: {
    title: 'Balanced Coverage',
    description: 'Protection with wealth building (25% of fluid cash)',
    protectionRatio: 0.15, // 15% of fluid income
    wealthRatio: 0.07, // 7% to wealth building
    legacyRatio: 0.03, // 3% to legacy
    comment: 'Balanced protection with some wealth building',
    totalRatio: 0.25, // 25% total
  },
  Comprehensive: {
    title: 'Full Planning',
    description:
      'Complete protection with strong wealth focus (40% of fluid cash)',
    protectionRatio: 0.2, // 20% of fluid income
    wealthRatio: 0.15, // 15% to wealth building
    legacyRatio: 0.05, // 5% to legacy
    comment: 'Complete protection with strong wealth focus',
    totalRatio: 0.4, // 40% total
  },
};

// UI Configuration
const UI_CONFIG = {
  incomeSlider: {
    min: 3000,
    max: 50000,
    default: 4000,
    step: 100,
  },
  expenditureSlider: {
    min: 30,
    max: 90,
    default: 60,
    step: 5,
  },
  fluidSavingsInput: {
    min: 0,
    max: 1000000,
    default: 0,
    step: 1000,
  },
};

export function PlanningJourney() {
  // State management
  const [profile, setProfile] = useState<UserProfile>({
    age: 30,
    monthlyIncome: UI_CONFIG.incomeSlider.default,
    expenditureRatio: UI_CONFIG.expenditureSlider.default,
    investmentPreference: 'Balanced',
  });

  // Adding input state to handle intermediate values during typing
  const [inputValues, setInputValues] = useState({
    age: profile.age.toString(),
    monthlyIncome: profile.monthlyIncome.toString(),
    expenditureRatio: profile.expenditureRatio.toString(),
  });

  // Contact info state
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    email: '',
    phone: '',
  });

  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<'purchase' | 'schedule' | null>(
    null
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Determine life stage based on age
  const determineLifeStage = () => {
    if (profile.age <= 40) return lifeStageOptions[0];
    if (profile.age <= 55) return lifeStageOptions[1];
    return lifeStageOptions[2];
  };

  // Determine product track based on annual fluid cash
  const determineProductTrack = () => {
    const annualFluid =
      profile.monthlyIncome * (1 - profile.expenditureRatio / 100) * 12;
    // Use adjusted fluid cash (annual fluid cash * investment preference)
    const adjustedFluid =
      annualFluid * PREFERENCE_CONFIG[profile.investmentPreference].totalRatio;

    if (adjustedFluid < 5000) return productTrackOptions[0];
    if (adjustedFluid <= 15000) return productTrackOptions[1];
    return productTrackOptions[2];
  };

  // Handle investment preference selection
  const handlePreferenceSelect = (preference: InvestmentPreference) => {
    setProfile({
      ...profile,
      investmentPreference: preference,
    });
  };

  // Derived calculations
  const monthlyFluidCash =
    profile.monthlyIncome * (1 - profile.expenditureRatio / 100);
  const annualFluidCash = monthlyFluidCash * 12;
  const lifeStage = determineLifeStage();
  const productTrack = determineProductTrack();

  // Calculate sustainable allocations for all tiers
  const calculateTierAllocations = (preference: InvestmentPreference) => {
    const allocation = PREFERENCE_CONFIG[preference];
    return {
      protection: annualFluidCash * allocation.protectionRatio,
      wealth: annualFluidCash * allocation.wealthRatio,
      legacy: annualFluidCash * allocation.legacyRatio,
      total: annualFluidCash * allocation.totalRatio,
    };
  };

  // Current tier allocation
  const allTierAllocations = {
    Minimal: calculateTierAllocations('Minimal'),
    Balanced: calculateTierAllocations('Balanced'),
    Comprehensive: calculateTierAllocations('Comprehensive'),
  };

  // Current tier allocation
  const sustainableAllocation =
    allTierAllocations[profile.investmentPreference];

  // Handle opening the dialog
  const openDialog = (type: 'purchase' | 'schedule') => {
    setActionType(type);
    setDialogOpen(true);
  };

  // Handle contact info changes
  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    // Here you would typically send this data to your backend
    console.log('Contact Info:', contactInfo);
    console.log('Action Type:', actionType);
    console.log('User Profile:', profile);

    // Close the dialog
    setDialogOpen(false);

    // Reset contact info
    setContactInfo({
      name: '',
      email: '',
      phone: '',
    });

    // Show success message (this could be a toast or another dialog)
    alert(
      actionType === 'purchase'
        ? 'Thank you for your purchase! Our team will contact you shortly.'
        : 'Thank you for scheduling a call! Our team will contact you shortly.'
    );
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="SP Generations Logo"
                  width={150}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-900">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-900">
                About us
              </Link>
              <Link
                href="/services"
                className="text-gray-700 hover:text-blue-900"
              >
                Our Services
              </Link>
              <Link href="/team" className="text-gray-700 hover:text-blue-900">
                Our Team
              </Link>
              <Link
                href="/career"
                className="text-gray-700 hover:text-blue-900"
              >
                Career
              </Link>
              <div className="relative">
                <button className="bg-blue-900 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-colors">
                  Contact Us
                </button>
              </div>
            </div>
            <div className="md:hidden">
              <button
                className="text-gray-700"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Mobile Menu */}
          <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-lg mt-2">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-blue-900 hover:bg-gray-50 rounded-md"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-gray-700 hover:text-blue-900 hover:bg-gray-50 rounded-md"
              >
                About us
              </Link>
              <Link
                href="/services"
                className="block px-3 py-2 text-gray-700 hover:text-blue-900 hover:bg-gray-50 rounded-md"
              >
                Our Services
              </Link>
              <Link
                href="/team"
                className="block px-3 py-2 text-gray-700 hover:text-blue-900 hover:bg-gray-50 rounded-md"
              >
                Our Team
              </Link>
              <Link
                href="/career"
                className="block px-3 py-2 text-gray-700 hover:text-blue-900 hover:bg-gray-50 rounded-md"
              >
                Career
              </Link>
              <div className="px-3 py-2">
                <button className="bg-blue-900 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-800 transition-colors w-full text-center">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Title Section */}
      <section className="pt-32 pb-6 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Financial Planning Journey
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the right financial strategy for your life stage and goals
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 space-y-6 md:space-y-8">
        {/* Profile Card */}
        <Card className="p-4 md:p-6">
          <div className="space-y-6">
            {/* Profile Inputs - More compact for mobile */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Age Input */}
              <div>
                <Label className="text-md font-semibold">Age</Label>
                <p className="text-xs text-gray-500 mb-2">Your current age</p>
                <Input
                  type="number"
                  value={inputValues.age}
                  onChange={(e) => {
                    // Store the raw string value
                    setInputValues({
                      ...inputValues,
                      age: e.target.value,
                    });

                    // Only update the actual profile if it's a valid number
                    const parsed = parseInt(e.target.value);
                    if (!isNaN(parsed)) {
                      setProfile({
                        ...profile,
                        age: Math.min(75, Math.max(20, parsed)),
                      });
                    }
                  }}
                  onBlur={() => {
                    // On blur, ensure the displayed value matches the valid profile value
                    setInputValues({
                      ...inputValues,
                      age: profile.age.toString(),
                    });
                  }}
                  min={20}
                  max={75}
                  className="w-full"
                />
              </div>

              {/* Income Input */}
              <div>
                <Label className="text-md font-semibold">Monthly Income</Label>
                <p className="text-xs text-gray-500 mb-2">
                  Your monthly income
                </p>
                <Input
                  type="number"
                  value={inputValues.monthlyIncome}
                  onChange={(e) => {
                    // Store the raw string value
                    setInputValues({
                      ...inputValues,
                      monthlyIncome: e.target.value,
                    });

                    // Only update the actual profile if it's a valid number
                    const parsed = parseInt(e.target.value);
                    if (!isNaN(parsed)) {
                      setProfile({
                        ...profile,
                        monthlyIncome: Math.max(
                          UI_CONFIG.incomeSlider.min,
                          Math.min(UI_CONFIG.incomeSlider.max, parsed)
                        ),
                      });
                    }
                  }}
                  onBlur={() => {
                    // On blur, ensure the displayed value matches the valid profile value
                    setInputValues({
                      ...inputValues,
                      monthlyIncome: profile.monthlyIncome.toString(),
                    });
                  }}
                  min={UI_CONFIG.incomeSlider.min}
                  max={UI_CONFIG.incomeSlider.max}
                  step={UI_CONFIG.incomeSlider.step}
                  className="w-full"
                />
              </div>

              {/* Expenditure Input */}
              <div>
                <Label className="text-md font-semibold">
                  Monthly Expenditure
                </Label>
                <p className="text-xs text-gray-500 mb-2">
                  % of income spent monthly
                </p>
                <Input
                  type="number"
                  value={inputValues.expenditureRatio}
                  onChange={(e) => {
                    // Store the raw string value
                    setInputValues({
                      ...inputValues,
                      expenditureRatio: e.target.value,
                    });

                    // Only update the actual profile if it's a valid number
                    const parsed = parseInt(e.target.value);
                    if (!isNaN(parsed)) {
                      setProfile({
                        ...profile,
                        expenditureRatio: Math.max(
                          UI_CONFIG.expenditureSlider.min,
                          Math.min(UI_CONFIG.expenditureSlider.max, parsed)
                        ),
                      });
                    }
                  }}
                  onBlur={() => {
                    // On blur, ensure the displayed value matches the valid profile value
                    setInputValues({
                      ...inputValues,
                      expenditureRatio: profile.expenditureRatio.toString(),
                    });
                  }}
                  min={UI_CONFIG.expenditureSlider.min}
                  max={UI_CONFIG.expenditureSlider.max}
                  step={UI_CONFIG.expenditureSlider.step}
                  className="w-full"
                />
                <span className="text-xs text-gray-500">%</span>
              </div>
            </div>

            {/* Investment Preference */}
            <div>
              <Label className="text-md font-semibold">
                Investment Preference
              </Label>
              <p className="text-xs text-gray-500 mb-2">
                Choose your preferred level of financial planning
              </p>
              <div className="space-y-2">
                {Object.entries(PREFERENCE_CONFIG).map(([key, config]) => (
                  <div
                    key={key}
                    className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-blue-100 ${
                      key === profile.investmentPreference
                        ? 'bg-blue-50 border-2 border-blue-200'
                        : 'bg-gray-50'
                    }`}
                    onClick={() =>
                      handlePreferenceSelect(key as InvestmentPreference)
                    }
                  >
                    <div className="flex justify-between items-center">
                      <h5 className="font-medium text-sm">{config.title}</h5>
                      <span className="text-xs text-gray-500">
                        {config.totalRatio * 100}% allocation
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {config.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Financial Capacity Section */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            Your Financial Capacity
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Monthly Fluid Cash */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <Label className="text-sm text-gray-500">
                  Monthly Fluid Cash
                </Label>
                <div className="mt-1">
                  <p className="text-xl font-semibold">
                    ${monthlyFluidCash.toLocaleString()}
                  </p>
                  <div className="text-xs text-gray-500 mt-1">
                    Based on {profile.expenditureRatio}% monthly expenditure
                  </div>
                </div>
              </div>

              {/* Investment Budget */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <Label className="text-sm text-gray-500">
                  Investment Budget
                </Label>
                <div className="mt-1">
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold">
                      $
                      {(
                        monthlyFluidCash *
                        PREFERENCE_CONFIG[profile.investmentPreference]
                          .totalRatio *
                        12
                      ).toLocaleString()}
                      <span className="text-sm font-normal">/year</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      ($
                      {(
                        monthlyFluidCash *
                        PREFERENCE_CONFIG[profile.investmentPreference]
                          .totalRatio
                      ).toLocaleString()}{' '}
                      per month)
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {PREFERENCE_CONFIG[profile.investmentPreference]
                      .totalRatio * 100}
                    % of fluid cash (
                    {PREFERENCE_CONFIG[profile.investmentPreference].title})
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Classification Card - Modified to include sustainable allocations */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            Your Profile Classification
          </h3>
          <div className="space-y-6">
            {/* Life Stage */}
            <div>
              <h4 className="font-medium mb-2">Life Stage</h4>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{lifeStage.icon}</span>
                  <div>
                    <div className="font-medium">{lifeStage.label}</div>
                    <div className="text-sm text-gray-500">
                      {lifeStage.description}
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {lifeStage.details}
                </p>
              </div>
            </div>

            {/* Product Track */}
            <div>
              <h4 className="font-medium mb-2">Product Track</h4>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{productTrack.icon}</span>
                  <div>
                    <div className="font-medium">{productTrack.label}</div>
                    <div className="text-sm text-gray-500">
                      {productTrack.description}
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-blue-100">
                  <div className="text-sm">
                    <span className="text-gray-600">Annual Fluid Cash: </span>
                    <span className="font-medium">
                      ${annualFluidCash.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm mt-1">
                    <span className="text-gray-600">
                      Adjusted for Investment:{' '}
                    </span>
                    <span className="font-medium">
                      $
                      {(
                        annualFluidCash *
                        PREFERENCE_CONFIG[profile.investmentPreference]
                          .totalRatio
                      ).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {annualFluidCash *
                      PREFERENCE_CONFIG[profile.investmentPreference]
                        .totalRatio <
                    5000
                      ? 'Based on your adjusted fluid cash being less than $5,000, we recommend our Essential Track for core protection and basic savings.'
                      : annualFluidCash *
                          PREFERENCE_CONFIG[profile.investmentPreference]
                            .totalRatio <=
                        15000
                      ? 'With adjusted fluid cash between $5,000 - $15,000, our Preferred Track offers enhanced protection with wealth accumulation options.'
                      : 'Your adjusted fluid cash exceeds $15,000, qualifying you for our Prestige Track with comprehensive coverage and sophisticated planning options.'}
                  </p>
                </div>

                {/* Sustainable Allocations - Added to Classification Card */}
                <div className="mt-4 pt-4 border-t border-blue-100">
                  <h5 className="font-medium mb-2">Sustainable Allocations</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col bg-gray-50 p-3 rounded-lg">
                      <Label className="text-sm text-gray-500 mb-1 break-words">
                        Protection
                      </Label>
                      <p className="text-lg font-semibold">
                        ${sustainableAllocation.protection.toLocaleString()}
                        /year
                      </p>
                    </div>
                    <div className="flex flex-col bg-gray-50 p-3 rounded-lg">
                      <Label className="text-sm text-gray-500 mb-1 break-words">
                        Wealth Building
                      </Label>
                      <p className="text-lg font-semibold">
                        ${sustainableAllocation.wealth.toLocaleString()}/year
                      </p>
                    </div>
                    <div className="flex flex-col bg-gray-50 p-3 rounded-lg">
                      <Label className="text-sm text-gray-500 mb-1 break-words">
                        Legacy Planning
                      </Label>
                      <p className="text-lg font-semibold">
                        ${sustainableAllocation.legacy.toLocaleString()}/year
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-blue-100">
                    <Label className="text-sm text-gray-500">
                      Total Allocation
                    </Label>
                    <p className="text-lg font-semibold">
                      ${sustainableAllocation.total.toLocaleString()}/year
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {PREFERENCE_CONFIG[profile.investmentPreference].comment}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Proposal Section - New section with pie chart and simplified focus areas */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            Your Strategic Proposal
          </h3>
          <div className="space-y-6">
            {/* Pie Chart Visualization */}
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/2 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: 'Protection',
                          value: Math.round(
                            (PREFERENCE_CONFIG[profile.investmentPreference]
                              .protectionRatio /
                              PREFERENCE_CONFIG[profile.investmentPreference]
                                .totalRatio) *
                              100
                          ),
                          color: '#3b82f6', // blue
                        },
                        {
                          name: 'Wealth',
                          value: Math.round(
                            (PREFERENCE_CONFIG[profile.investmentPreference]
                              .wealthRatio /
                              PREFERENCE_CONFIG[profile.investmentPreference]
                                .totalRatio) *
                              100
                          ),
                          color: '#22c55e', // green
                        },
                        {
                          name: 'Legacy',
                          value: Math.round(
                            (PREFERENCE_CONFIG[profile.investmentPreference]
                              .legacyRatio /
                              PREFERENCE_CONFIG[profile.investmentPreference]
                                .totalRatio) *
                              100
                          ),
                          color: '#a855f7', // purple
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ percent }: { name: string; percent: number }) =>
                        `${Math.round(percent * 100)}%`
                      }
                    >
                      {[
                        { name: 'Protection', color: '#3b82f6' },
                        { name: 'Wealth', color: '#22c55e' },
                        { name: 'Legacy', color: '#a855f7' },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2">
                <h4 className="font-medium mb-3">
                  Allocation Based on Your Profile
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  This proposal is customized for your{' '}
                  {lifeStage.label.toLowerCase()} and{' '}
                  {productTrack.label.toLowerCase()}, with a{' '}
                  {profile.investmentPreference.toLowerCase()} investment
                  approach.
                </p>

                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                      <h5 className="font-medium">
                        Protection Focus (
                        {Math.round(
                          (PREFERENCE_CONFIG[profile.investmentPreference]
                            .protectionRatio /
                            PREFERENCE_CONFIG[profile.investmentPreference]
                              .totalRatio) *
                            100
                        )}
                        %)
                      </h5>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Essential coverage for health and life risks
                    </p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                      <h5 className="font-medium">
                        Wealth Focus (
                        {Math.round(
                          (PREFERENCE_CONFIG[profile.investmentPreference]
                            .wealthRatio /
                            PREFERENCE_CONFIG[profile.investmentPreference]
                              .totalRatio) *
                            100
                        )}
                        %)
                      </h5>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Building assets for long-term growth
                    </p>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                      <h5 className="font-medium">
                        Legacy Focus (
                        {Math.round(
                          (PREFERENCE_CONFIG[profile.investmentPreference]
                            .legacyRatio /
                            PREFERENCE_CONFIG[profile.investmentPreference]
                              .totalRatio) *
                            100
                        )}
                        %)
                      </h5>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Wealth preservation and transfer planning
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Life Stage Planning - New section showing current and future plans */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            Your Life Stage Journey
          </h3>
          <div className="space-y-6">
            <p className="text-sm text-gray-600">
              Based on your current age of {profile.age}, we&apos;ve prepared a
              roadmap for your financial journey through key life stages, with
              recommended products and estimated annual costs (assuming income
              remains constant).
            </p>

            {/* Current Life Stage */}
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-medium mb-2">
                Current Stage: {lifeStage.label}
              </h4>
              <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{lifeStage.icon}</span>
                  <span className="text-sm text-gray-600">
                    {lifeStage.description}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-white rounded-lg border border-blue-100">
                    <div className="font-medium text-blue-600">Protection</div>
                    <div className="text-sm mt-1">
                      ${sustainableAllocation.protection.toLocaleString()}/year
                    </div>
                    {lifeStage.value === 'Wealth Building' && (
                      <div className="text-xs text-gray-500 mt-1">
                        {productTrack.value === 'Essential'
                          ? 'AIA Prime Critical Cover + HealthShield Gold Max'
                          : productTrack.value === 'Preferred'
                          ? 'AIA Beyond Critical Care + Pro Lifetime Protector (II)'
                          : 'AIA Absolute Critical Cover + Platinum International Health'}
                      </div>
                    )}
                    {lifeStage.value === 'Wealth Acceleration' && (
                      <div className="text-xs text-gray-500 mt-1">
                        {productTrack.value === 'Essential'
                          ? 'AIA Prime Critical Cover + HealthShield Gold Max'
                          : productTrack.value === 'Preferred'
                          ? 'AIA Beyond Critical Care + HealthShield Gold Max'
                          : 'AIA Absolute Critical Cover + Platinum International Health'}
                      </div>
                    )}
                    {lifeStage.value === 'Legacy Planning' && (
                      <div className="text-xs text-gray-500 mt-1">
                        {productTrack.value === 'Essential'
                          ? 'AIA Prime Critical Cover + HealthShield Gold Max'
                          : productTrack.value === 'Preferred'
                          ? 'AIA Beyond Critical Care + HealthShield Gold Max'
                          : 'AIA Absolute Critical Cover + Platinum International Health'}
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-green-100">
                    <div className="font-medium text-green-600">Wealth</div>
                    <div className="text-sm mt-1">
                      ${sustainableAllocation.wealth.toLocaleString()}/year
                    </div>
                    {lifeStage.value === 'Wealth Building' && (
                      <div className="text-xs text-gray-500 mt-1">
                        {productTrack.value === 'Essential'
                          ? 'AIA Elite Secure Income'
                          : productTrack.value === 'Preferred'
                          ? 'AIA Pro Achiever 3.0'
                          : 'AIA Platinum Wealth Elite 2.0'}
                      </div>
                    )}
                    {lifeStage.value === 'Wealth Acceleration' && (
                      <div className="text-xs text-gray-500 mt-1">
                        {productTrack.value === 'Essential'
                          ? 'AIA Elite Secure Income + Invest Easy'
                          : productTrack.value === 'Preferred'
                          ? 'AIA Pro Achiever 3.0 + ProRewards'
                          : 'AIA Platinum Wealth Elite 2.0 + Platinum Retirement Elite'}
                      </div>
                    )}
                    {lifeStage.value === 'Legacy Planning' && (
                      <div className="text-xs text-gray-500 mt-1">
                        {productTrack.value === 'Essential'
                          ? 'AIA Elite Secure Income'
                          : productTrack.value === 'Preferred'
                          ? 'AIA Pro Achiever 3.0 + ProRewards'
                          : 'AIA Platinum Retirement Elite'}
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-purple-100">
                    <div className="font-medium text-purple-600">Legacy</div>
                    <div className="text-sm mt-1">
                      ${sustainableAllocation.legacy.toLocaleString()}/year
                    </div>
                    {lifeStage.value === 'Wealth Building' && (
                      <div className="text-xs text-gray-500 mt-1">
                        {productTrack.value === 'Essential'
                          ? 'Riders on existing policies'
                          : productTrack.value === 'Preferred'
                          ? 'Term rider with AIA Pro Lifetime Protector (II)'
                          : 'AIA Platinum Heritage Wealth (II)'}
                      </div>
                    )}
                    {lifeStage.value === 'Wealth Acceleration' && (
                      <div className="text-xs text-gray-500 mt-1">
                        {productTrack.value === 'Essential'
                          ? 'AIA Pro Term with legacy riders'
                          : productTrack.value === 'Preferred'
                          ? 'AIA Pro Lifetime Protector (II) with legacy options'
                          : 'AIA Platinum Wealth Legacy'}
                      </div>
                    )}
                    {lifeStage.value === 'Legacy Planning' && (
                      <div className="text-xs text-gray-500 mt-1">
                        {productTrack.value === 'Essential'
                          ? 'AIA Pro Term with enhanced legacy riders'
                          : productTrack.value === 'Preferred'
                          ? 'AIA Pro Lifetime Protector (II) with enhanced options'
                          : 'AIA Platinum Wealth Legacy + Platinum Generations (II)'}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-blue-100">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">
                      Total Annual Cost:
                    </span>
                    <span className="text-sm font-medium">
                      ${sustainableAllocation.total.toLocaleString()}/year
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Future Life Stages */}
            {lifeStage.value === 'Wealth Building' && (
              <>
                <div className="border-l-4 border-gray-300 pl-4">
                  <h4 className="font-medium mb-2">
                    Next Stage: Wealth Acceleration Phase
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">🚀</span>
                      <span className="text-sm text-gray-600">
                        Age 41-55: Focus on maximizing wealth accumulation
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      As you enter this phase, your protection needs will start
                      to decrease while your wealth accumulation and legacy
                      planning needs will increase. We recommend gradually
                      transitioning to:
                    </p>
                    {/* Projected allocations for Wealth Acceleration */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <div className="font-medium text-gray-600">
                          Protection (40-50%)
                        </div>
                        <div className="text-sm mt-1">
                          $
                          {Math.round(
                            annualFluidCash * 0.4 * 0.45
                          ).toLocaleString()}
                          /year
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Enhanced critical illness coverage and health
                          protection
                        </div>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <div className="font-medium text-gray-600">
                          Wealth (40-45%)
                        </div>
                        <div className="text-sm mt-1">
                          $
                          {Math.round(
                            annualFluidCash * 0.4 * 0.45
                          ).toLocaleString()}
                          /year
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Diversified investment portfolio and retirement
                          planning
                        </div>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <div className="font-medium text-gray-600">
                          Legacy (10-15%)
                        </div>
                        <div className="text-sm mt-1">
                          $
                          {Math.round(
                            annualFluidCash * 0.4 * 0.1
                          ).toLocaleString()}
                          /year
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Begin structuring your legacy planning solutions
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          Projected Annual Cost:
                        </span>
                        <span className="text-sm font-medium">
                          ${Math.round(annualFluidCash * 0.4).toLocaleString()}
                          /year
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Based on your current income and Comprehensive planning
                        approach
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-gray-300 pl-4">
                  <h4 className="font-medium mb-2">
                    Final Stage: Legacy Planning Phase
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">👑</span>
                      <span className="text-sm text-gray-600">
                        Age 56+: Focus on wealth distribution and preservation
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      In your final phase, your legacy planning needs will be at
                      their highest, with a balanced approach to protection and
                      wealth preservation.
                    </p>
                    {/* Projected allocations for Legacy Planning */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <div className="font-medium text-gray-600">
                          Protection (25-30%)
                        </div>
                        <div className="text-sm mt-1">
                          $
                          {Math.round(
                            annualFluidCash * 0.4 * 0.25
                          ).toLocaleString()}
                          /year
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Comprehensive health and critical illness coverage
                        </div>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <div className="font-medium text-gray-600">
                          Wealth (30-35%)
                        </div>
                        <div className="text-sm mt-1">
                          $
                          {Math.round(
                            annualFluidCash * 0.4 * 0.35
                          ).toLocaleString()}
                          /year
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Income-generating investments and retirement funds
                        </div>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <div className="font-medium text-gray-600">
                          Legacy (40%)
                        </div>
                        <div className="text-sm mt-1">
                          $
                          {Math.round(
                            annualFluidCash * 0.4 * 0.4
                          ).toLocaleString()}
                          /year
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Comprehensive estate and succession planning
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          Projected Annual Cost:
                        </span>
                        <span className="text-sm font-medium">
                          ${Math.round(annualFluidCash * 0.4).toLocaleString()}
                          /year
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Based on your current income and Comprehensive planning
                        approach
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {lifeStage.value === 'Wealth Acceleration' && (
              <div className="border-l-4 border-gray-300 pl-4">
                <h4 className="font-medium mb-2">
                  Next Stage: Legacy Planning Phase
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">👑</span>
                    <span className="text-sm text-gray-600">
                      Age 56+: Focus on wealth distribution and preservation
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    In your next phase, your legacy planning needs will increase
                    significantly, with a strategic approach to protection and
                    wealth preservation.
                  </p>
                  {/* Projected allocations for Legacy Planning */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="font-medium text-gray-600">
                        Protection (25-30%)
                      </div>
                      <div className="text-sm mt-1">
                        $
                        {Math.round(
                          annualFluidCash * 0.4 * 0.25
                        ).toLocaleString()}
                        /year
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Comprehensive health and critical illness coverage
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="font-medium text-gray-600">
                        Wealth (30-35%)
                      </div>
                      <div className="text-sm mt-1">
                        $
                        {Math.round(
                          annualFluidCash * 0.4 * 0.35
                        ).toLocaleString()}
                        /year
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Income-generating investments and retirement funds
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="font-medium text-gray-600">
                        Legacy (40%)
                      </div>
                      <div className="text-sm mt-1">
                        $
                        {Math.round(
                          annualFluidCash * 0.4 * 0.4
                        ).toLocaleString()}
                        /year
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Comprehensive estate and succession planning
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        Projected Annual Cost:
                      </span>
                      <span className="text-sm font-medium">
                        ${Math.round(annualFluidCash * 0.4).toLocaleString()}
                        /year
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Based on your current income and Comprehensive planning
                      approach
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Next Steps - Mobile Friendly Buttons */}
        <div className="flex flex-col sm:flex-row justify-end mt-6 space-y-3 sm:space-y-0 sm:space-x-4">
          <Button
            onClick={() => openDialog('purchase')}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 w-full sm:w-auto text-sm sm:text-base"
          >
            Purchase Plan
          </Button>
          <Button
            onClick={() => openDialog('schedule')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-sm sm:text-base"
          >
            Schedule a Call
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Image
                src="/images/logo.png"
                alt="SP Generations Logo"
                width={150}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <div className="text-center md:text-right">
              <p>© 2024 SP Generations. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md max-h-[95vh] overflow-y-auto p-0">
          <DialogHeader className="px-6">
            <DialogTitle>
              {actionType === 'purchase'
                ? 'Confirm Your Purchase'
                : 'Schedule a Call with Our Advisor'}
            </DialogTitle>
            <DialogDescription>
              {actionType === 'purchase'
                ? 'Please review your selected plans and provide your contact information.'
                : 'Please provide your contact information and our advisor will get in touch with you.'}
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 py-4">
            {/* Plan Summary - only for purchase */}
            {actionType === 'purchase' && (
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Your Selected Plans:</h3>

                <div className="bg-blue-50 p-3 rounded-md">
                  <h4 className="font-medium text-sm text-blue-600">
                    Protection
                  </h4>
                  <div className="text-sm mt-1">
                    {lifeStage.value === 'Wealth Building' && (
                      <div className="text-xs text-gray-700">
                        {productTrack.value === 'Essential'
                          ? 'AIA Prime Critical Cover + HealthShield Gold Max'
                          : productTrack.value === 'Preferred'
                          ? 'AIA Beyond Critical Care + Pro Lifetime Protector (II)'
                          : 'AIA Absolute Critical Cover + Platinum International Health'}
                      </div>
                    )}
                    {lifeStage.value === 'Wealth Acceleration' && (
                      <div className="text-xs text-gray-700">
                        {productTrack.value === 'Essential'
                          ? 'AIA Prime Critical Cover + HealthShield Gold Max'
                          : productTrack.value === 'Preferred'
                          ? 'AIA Beyond Critical Care + HealthShield Gold Max'
                          : 'AIA Absolute Critical Cover + Platinum International Health'}
                      </div>
                    )}
                    {lifeStage.value === 'Legacy Planning' && (
                      <div className="text-xs text-gray-700">
                        {productTrack.value === 'Essential'
                          ? 'AIA Prime Critical Cover + HealthShield Gold Max'
                          : productTrack.value === 'Preferred'
                          ? 'AIA Beyond Critical Care + HealthShield Gold Max'
                          : 'AIA Absolute Critical Cover + Platinum International Health'}
                      </div>
                    )}
                    <div className="font-medium mt-1">
                      ${sustainableAllocation.protection.toLocaleString()}/year
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-md">
                  <h4 className="font-medium text-sm text-green-600">Wealth</h4>
                  <div className="text-sm mt-1">
                    {lifeStage.value === 'Wealth Building' && (
                      <div className="text-xs text-gray-700">
                        {productTrack.value === 'Essential'
                          ? 'AIA Elite Secure Income'
                          : productTrack.value === 'Preferred'
                          ? 'AIA Pro Achiever 3.0'
                          : 'AIA Platinum Wealth Elite 2.0'}
                      </div>
                    )}
                    {lifeStage.value === 'Wealth Acceleration' && (
                      <div className="text-xs text-gray-700">
                        {productTrack.value === 'Essential'
                          ? 'AIA Elite Secure Income + Invest Easy'
                          : productTrack.value === 'Preferred'
                          ? 'AIA Pro Achiever 3.0 + ProRewards'
                          : 'AIA Platinum Wealth Elite 2.0 + Platinum Retirement Elite'}
                      </div>
                    )}
                    {lifeStage.value === 'Legacy Planning' && (
                      <div className="text-xs text-gray-700">
                        {productTrack.value === 'Essential'
                          ? 'AIA Elite Secure Income'
                          : productTrack.value === 'Preferred'
                          ? 'AIA Pro Achiever 3.0 + ProRewards'
                          : 'AIA Platinum Retirement Elite'}
                      </div>
                    )}
                    <div className="font-medium mt-1">
                      ${sustainableAllocation.wealth.toLocaleString()}/year
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-3 rounded-md">
                  <h4 className="font-medium text-sm text-purple-600">
                    Legacy
                  </h4>
                  <div className="text-sm mt-1">
                    {lifeStage.value === 'Wealth Building' && (
                      <div className="text-xs text-gray-700">
                        {productTrack.value === 'Essential'
                          ? 'Riders on existing policies'
                          : productTrack.value === 'Preferred'
                          ? 'Term rider with AIA Pro Lifetime Protector (II)'
                          : 'AIA Platinum Heritage Wealth (II)'}
                      </div>
                    )}
                    {lifeStage.value === 'Wealth Acceleration' && (
                      <div className="text-xs text-gray-700">
                        {productTrack.value === 'Essential'
                          ? 'AIA Pro Term with legacy riders'
                          : productTrack.value === 'Preferred'
                          ? 'AIA Pro Lifetime Protector (II) with legacy options'
                          : 'AIA Platinum Wealth Legacy'}
                      </div>
                    )}
                    {lifeStage.value === 'Legacy Planning' && (
                      <div className="text-xs text-gray-700">
                        {productTrack.value === 'Essential'
                          ? 'AIA Pro Term with enhanced legacy riders'
                          : productTrack.value === 'Preferred'
                          ? 'AIA Pro Lifetime Protector (II) with enhanced options'
                          : 'AIA Platinum Wealth Legacy + Platinum Generations (II)'}
                      </div>
                    )}
                    <div className="font-medium mt-1">
                      ${sustainableAllocation.legacy.toLocaleString()}/year
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between">
                    <span className="font-medium">Total Annual Cost:</span>
                    <span className="font-medium">
                      ${sustainableAllocation.total.toLocaleString()}/year
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {PREFERENCE_CONFIG[profile.investmentPreference].title} -{' '}
                    {productTrack.label} - {lifeStage.label}
                  </div>
                </div>
              </div>
            )}

            {/* Contact Form */}
            <div className="space-y-4 mt-4">
              <h3 className="font-medium text-sm">Contact Information</h3>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={contactInfo.name}
                    onChange={handleContactInfoChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={handleContactInfoChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={contactInfo.phone}
                    onChange={handleContactInfoChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-white border-t w-full">
            <DialogFooter className="px-6 py-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                className={`w-full sm:w-auto ${
                  actionType === 'purchase'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {actionType === 'purchase'
                  ? 'Confirm Purchase'
                  : 'Schedule Call'}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PlanningJourney;
