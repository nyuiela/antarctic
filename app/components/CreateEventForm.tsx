"use client";

import React, { useState } from "react";
import { Button } from "./DemoComponents";
import { Icon } from "./DemoComponents";
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";


type EventFormData = {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  coordinates: { lat: number; lng: number };
  image: string;
  category: string;
  maxParticipants: number;
  isLive: boolean;
  platforms: string[];
  totalRewards: number;
  hosts: {
    name: string;
    avatar: string;
    role: string;
    bio?: string;
    social?: {
      twitter?: string;
      linkedin?: string;
      website?: string;
    };
  }[];
  agenda: {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    speakers?: string[];
  }[];
  sponsors: {
    name: string;
    logo: string;
    link: string;
  }[];
  tickets: {
    available: boolean;
    types: { type: string; price: number; currency: string; quantity: number; perks?: string[] }[];
  };
  socialLinks: {
    twitter?: string;
    discord?: string;
    website?: string;
  };
  tempHost?: {
    name: string;
    role: string;
  };
  tempAgenda?: {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    speakers: string[];
  };
  tempTicket?: {
    type: string;
    price: number;
    currency: string;
    quantity: number;
    perks: string[];
  };
};

const CreateEventForm = () => {
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    coordinates: { lat: 0, lng: 0 },
    image: "",
    category: "",
    maxParticipants: 100,
    isLive: false,
    platforms: [],
    totalRewards: 0,
    hosts: [],
    agenda: [],
    sponsors: [],
    tickets: {
      available: false,
      types: [],
    },
    socialLinks: {},
    tempHost: { name: "", role: "" },
    tempAgenda: { title: "", description: "", startTime: "", endTime: "", speakers: [] },
    tempTicket: { type: "", price: 0, currency: "USD", quantity: 0, perks: [] },
  });

  const [currentStep, setCurrentStep] = useState(1);

  const categories = [
    "Gaming & Esports",
    "Technology",
    "Art & Culture",
    "Finance",
    "Music",
    "Sports",
    "Education",
    "Networking",
    "Other",
  ];



  const handleInputChange = (field: keyof EventFormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Event data:", formData);
    alert("Event created successfully!");
  };

  const steps = [
    { id: 1, title: "Basic Info", icon: "home" },
    { id: 2, title: "Details", icon: "share" },
    { id: 3, title: "Hosts", icon: "users" },
    { id: 4, title: "Agenda", icon: "calendar" },
    { id: 5, title: "Tickets", icon: "plus" },
    { id: 6, title: "Review", icon: "check" },
  ];

  return (
    <div className="min-h-screen text-[var(--app-foreground)] bg-background relative z-[20] pt-10 pb-24">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Progress Steps */}
        <div className="mb-8">
          {/* Desktop Steps */}
          <div className="hidden md:block">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${currentStep >= step.id
                      ? "bg-[var(--app-accent)] text-white"
                      : "bg-transparent border border-[var(--app-card-border)] text-[var(--app-foreground-muted)]"
                      }`}
                  >
                    <Icon name={step.icon as "home" | "share" | "users" | "calendar" | "star" | "plus" | "check"} size="sm" />
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-4 transition-all ${currentStep > step.id ? "bg-[var(--app-accent)]" : "bg-[var(--app-card-border)]"
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4">
              {steps.map((step) => (
                <span
                  key={step.id}
                  className={`text-xs transition-colors ${currentStep >= step.id
                    ? "text-[var(--app-accent)] font-medium"
                    : "text-[var(--app-foreground-muted)]"
                    }`}
                >
                  {step.title}
                </span>
              ))}
            </div>
          </div>

          {/* Mobile Steps */}
          <div className="md:hidden">
            {/* <div className="flex items-center justify-center mb-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${currentStep >= 1
                    ? "bg-[var(--app-accent)] text-white"
                    : "bg-transparent border border-[var(--app-card-border)] text-[var(--app-foreground-muted)]"
                    }`}
                >
                  <Icon name="home" size="sm" />
                </div>
                <span className="text-xs text-[var(--app-foreground-muted)]">→</span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${currentStep >= 2
                    ? "bg-[var(--app-accent)] text-white"
                    : "bg-transparent border border-[var(--app-card-border)] text-[var(--app-foreground-muted)]"
                    }`}
                >
                  <Icon name="share" size="sm" />
                </div>
                <span className="text-xs text-[var(--app-foreground-muted)]">→</span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${currentStep >= 3
                    ? "bg-[var(--app-accent)] text-white"
                    : "bg-transparent border border-[var(--app-card-border)] text-[var(--app-foreground-muted)]"
                    }`}
                >
                  <Icon name="users" size="sm" />
                </div>
                <span className="text-xs text-[var(--app-foreground-muted)]">...</span>
              </div>
            </div> */}

            <div className="text-center">
              <span className="text-sm font-medium text-[var(--app-accent)]">
                Step {currentStep} of {steps.length}
              </span>
              <p className="text-xs text-[var(--app-foreground-muted)] mt-1">
                {steps[currentStep - 1]?.title}
              </p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-transparent border-none border-[var(--app-card-border)] rounded-xl p-4 md:p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center mb-8">Basic Event Information</h2>

              {/* Event Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--app-foreground)]">
                  Event Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:border-[var(--app-accent)] focus:outline-none transition-colors"
                  placeholder="Enter event title"
                  required
                />
              </div>

              {/* Event Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--app-foreground)]">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-transparent border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:border-[var(--app-accent)] focus:outline-none transition-colors resize-none"
                  placeholder="Describe your event..."
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--app-foreground)]">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] focus:border-[var(--app-accent)] focus:outline-none transition-colors"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center mb-8">Event Details</h2>

              {/* Event Image */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--app-foreground)]">
                  Event Image URL
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    className="flex-1 px-4 py-3 bg-transparent border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:border-[var(--app-accent)] focus:outline-none transition-colors"
                    placeholder="https://example.com/image.jpg"
                  />
                  <Button
                    size="sm"
                    className="px-4 py-3"
                    icon={<Icon name="camera" size="sm" />}
                  >
                    Upload
                  </Button>
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--app-foreground)]">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] focus:border-[var(--app-accent)] focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--app-foreground)]">
                    Time *
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] focus:border-[var(--app-accent)] focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--app-foreground)]">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:border-[var(--app-accent)] focus:outline-none transition-colors"
                  placeholder="Enter event location"
                  required
                />
              </div>

              {/* Max Participants */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--app-foreground)]">
                  Maximum Participants
                </label>
                <input
                  type="number"
                  value={formData.maxParticipants}
                  onChange={(e) => handleInputChange('maxParticipants', parseInt(e.target.value))}
                  min="1"
                  className="w-full px-4 py-3 bg-transparent border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] focus:border-[var(--app-accent)] focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center mb-8">Event Hosts</h2>
              <p className="text-center text-[var(--app-foreground-muted)] mb-6">
                Add usernames of people who will be hosting this event
              </p>

              {/* Existing Hosts */}
              {formData.hosts.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Current Hosts</h3>
                  {formData.hosts.map((host, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-transparent border border-[var(--app-card-border)] rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[var(--app-accent)] rounded-full flex items-center justify-center">
                          <Icon name="users" size="sm" className="text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">@{host.name}</h4>
                          <p className="text-sm text-[var(--app-foreground-muted)]">{host.role}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const newHosts = formData.hosts.filter((_, i) => i !== index);
                          setFormData(prev => ({ ...prev, hosts: newHosts }));
                        }}
                        className="p-2 text-[var(--app-foreground-muted)] hover:text-red-500 transition-colors"
                      >
                        <Icon name="x" size="sm" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Host Form */}
              <div className="space-y-4 p-4 bg-transparent border border-[var(--app-card-border)] rounded-lg border-none">
                <h3 className="text-lg font-medium">Add New Host</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--app-foreground)]">
                      Username *
                    </label>
                    <input
                      type="text"
                      placeholder="@username"
                      value={formData.tempHost?.name || ""}
                      onChange={(e) => {
                        const username = e.target.value.replace('@', '');
                        setFormData(prev => ({
                          ...prev,
                          tempHost: { ...prev.tempHost!, name: username }
                        }));
                      }}
                      className="w-full px-4 py-3 bg-transparent border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:border-[var(--app-accent)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--app-foreground)]">
                      Role
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Organizer, Speaker, Host"
                      value={formData.tempHost?.role || ""}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          tempHost: { ...prev.tempHost!, role: e.target.value }
                        }));
                      }}
                      className="w-full px-4 py-3 bg-transparent border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:border-[var(--app-accent)] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <Button
                  onClick={() => {
                    if (formData.tempHost?.name && formData.tempHost.name.trim()) {
                      const newHost = {
                        name: formData.tempHost.name.trim(),
                        role: formData.tempHost.role || "Host",
                        avatar: "",
                        bio: "",
                        social: {}
                      };
                      setFormData(prev => ({
                        ...prev,
                        hosts: [...prev.hosts, newHost],
                        tempHost: { name: "", role: "" }
                      }));
                    }
                  }}
                  className="w-full py-3"
                  icon={<Icon name="plus" size="sm" />}
                >
                  Add Host
                </Button>
              </div>

              {/* Host Tips */}
              <div className="p-4 bg-transparent border border-[var(--app-card-border)] rounded-lg">
                <h4 className="font-medium mb-2">💡 Tips for adding hosts:</h4>
                <ul className="text-sm text-[var(--app-foreground-muted)] space-y-1">
                  <li>• Use usernames without the @ symbol</li>
                  <li>• Add a role to clarify their involvement</li>
                  <li>• You can add multiple hosts for different roles</li>
                  <li>• Hosts will be displayed on the event page</li>
                </ul>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-center mb-0">Event Agenda</h2>
              <p className="text-center text-[var(--app-foreground-muted)] mb-8">
                Plan the schedule and sessions for your event
              </p>

              {/* Existing Agenda Items */}
              {formData.agenda.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Current Agenda</h3>
                  {formData.agenda.map((item, index) => (
                    <div key={index} className="p-4 bg-transparent border border-[var(--app-card-border)] rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-lg">{item.title}</h4>
                        <button
                          onClick={() => {
                            const newAgenda = formData.agenda.filter((_, i) => i !== index);
                            setFormData(prev => ({ ...prev, agenda: newAgenda }));
                          }}
                          className="p-2 text-[var(--app-foreground-muted)] hover:text-red-500 transition-colors"
                        >
                          <Icon name="x" size="sm" />
                        </button>
                      </div>
                      <p className="text-sm text-[var(--app-foreground-muted)] mb-3">{item.description}</p>
                      <div className="flex items-center gap-4 text-xs text-[var(--app-foreground-muted)]">
                        <span className="flex items-center gap-1">
                          <Icon name="calendar" size="sm" />
                          {item.startTime} - {item.endTime}
                        </span>
                        {item.speakers && item.speakers.length > 0 && (
                          <span className="flex items-center gap-1">
                            <Icon name="users" size="sm" />
                            {item.speakers.join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Agenda Item Form */}
              <div className="space-y-4 p-4 px-0 bg-transparent border border-[var(--app-card-border)] rounded-lg border-none">
                <h3 className="text-lg font-medium">Add New Agenda Item</h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--app-foreground)]">
                      Session Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Opening Keynote, Panel Discussion, Networking Break"
                      value={formData.tempAgenda?.title || ""}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          tempAgenda: { ...prev.tempAgenda!, title: e.target.value }
                        }));
                      }}
                      className="w-full px-4 py-3 bg-transparent border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:border-[var(--app-accent)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--app-foreground)]">
                      Description
                    </label>
                    <textarea
                      placeholder="Describe what will happen in this session..."
                      value={formData.tempAgenda?.description || ""}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          tempAgenda: { ...prev.tempAgenda!, description: e.target.value }
                        }));
                      }}
                      rows={3}
                      className="w-full px-4 py-3 bg-transparent border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:border-[var(--app-accent)] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--app-foreground)]">
                        Start Time *
                      </label>
                      <input
                        type="time"
                        value={formData.tempAgenda?.startTime || ""}
                        onChange={(e) => {
                          setFormData(prev => ({
                            ...prev,
                            tempAgenda: { ...prev.tempAgenda!, startTime: e.target.value }
                          }));

                        }}
                        className="w-[80%] px-4 py-3 bg-transparent border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] focus:border-[var(--app-accent)] focus:outline-none transition-colors "
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--app-foreground)]">
                        End Time *
                      </label>
                      <input
                        type="time"
                        value={formData.tempAgenda?.endTime || ""}
                        onChange={(e) => {
                          setFormData(prev => ({
                            ...prev,
                            tempAgenda: { ...prev.tempAgenda!, endTime: e.target.value }
                          }));
                        }}
                        className="w-[80%] px-4 py-3 bg-transparent border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] focus:border-[var(--app-accent)] focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--app-foreground)]">
                      Speakers (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., @alice_smith, @bob_jones (comma separated)"
                      value={formData.tempAgenda?.speakers || ""}
                      onChange={(e) => {
                        const speakers = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                        setFormData(prev => ({
                          ...prev,
                          tempAgenda: { ...prev.tempAgenda!, speakers }
                        }));
                      }}
                      className="w-full px-4 py-3 bg-transparent border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:border-[var(--app-accent)] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <Button
                  onClick={() => {
                    if (formData.tempAgenda?.title && formData.tempAgenda?.startTime && formData.tempAgenda?.endTime) {
                      const newAgendaItem = {
                        title: formData.tempAgenda.title.trim(),
                        description: formData.tempAgenda.description || "",
                        startTime: formData.tempAgenda.startTime,
                        endTime: formData.tempAgenda.endTime,
                        speakers: formData.tempAgenda.speakers || []
                      };
                      setFormData(prev => ({
                        ...prev,
                        agenda: [...prev.agenda, newAgendaItem],
                        tempAgenda: { title: "", description: "", startTime: "", endTime: "", speakers: [] }
                      }));
                    }
                  }}
                  className="w-full py-3"
                  icon={<Icon name="plus" size="sm" />}
                >
                  Add Agenda Item
                </Button>
              </div>

              {/* Agenda Tips */}
              <div className="p-4 bg-transparent border border-[var(--app-card-border)] rounded-lg">
                <h4 className="font-medium mb-2">💡 Tips for creating your agenda:</h4>
                <ul className="text-sm text-[var(--app-foreground-muted)] space-y-1">
                  <li>• Start with opening remarks and welcome</li>
                  <li>• Include breaks for networking and refreshments</li>
                  <li>• Plan for Q&A sessions after presentations</li>
                  <li>• End with closing remarks and next steps</li>
                  <li>• Consider time zones if it&apos;s a virtual event</li>
                </ul>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center mb-8">Event Tickets</h2>
              <p className="text-center text-[var(--app-foreground-muted)] mb-6">
                Configure ticketing and pricing options for your event
              </p>

              {/* Ticket Availability Toggle */}
              <div className="flex items-center justify-between p-4 bg-transparent border border-[var(--app-card-border)] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--app-accent)] rounded-full flex items-center justify-center">
                    <Icon name="plus" size="sm" className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">Tickets Available</h3>
                    <p className="text-sm text-[var(--app-foreground-muted)]">Sell tickets for this event</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.tickets.available}
                    onChange={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        tickets: { ...prev.tickets, available: e.target.checked }
                      }));
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[var(--app-card-border)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--app-accent)]"></div>
                </label>
              </div>

              {/* Existing Ticket Types */}
              {formData.tickets.available && formData.tickets.types.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Current Ticket Types</h3>
                  {formData.tickets.types.map((ticket, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-transparent border border-[var(--app-card-border)] rounded-lg">
                      <div>
                        <h4 className="font-medium">{ticket.type}</h4>
                        <p className="text-sm text-[var(--app-foreground-muted)]">
                          ${ticket.price} {ticket.currency} • {ticket.quantity} available
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          const newTickets = formData.tickets.types.filter((_, i) => i !== index);
                          setFormData(prev => ({
                            ...prev,
                            tickets: { ...prev.tickets, types: newTickets }
                          }));
                        }}
                        className="p-2 text-[var(--app-foreground-muted)] hover:text-red-500 transition-colors"
                      >
                        <Icon name="x" size="sm" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Ticket Type Form */}
              {formData.tickets.available && (
                <div className="space-y-4 p-4 bg-transparent border border-[var(--app-card-border)] rounded-lg border-none">
                  <h3 className="text-lg font-medium">Add New Ticket Type</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--app-foreground)]">
                        Ticket Type *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., General Admission, VIP, Early Bird"
                        value={formData.tempTicket?.type || ""}
                        onChange={(e) => {
                          setFormData(prev => ({
                            ...prev,
                            tempTicket: { ...prev.tempTicket!, type: e.target.value }
                          }));
                        }}
                        className="w-full px-4 py-3 bg-transparent border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:border-[var(--app-accent)] focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--app-foreground)]">
                        Price *
                      </label>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={formData.tempTicket?.price || ""}
                        onChange={(e) => {
                          setFormData(prev => ({
                            ...prev,
                            tempTicket: { ...prev.tempTicket!, price: parseFloat(e.target.value) || 0 }
                          }));
                        }}
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 bg-transparent border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] focus:border-[var(--app-accent)] focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--app-foreground)]">
                        Currency
                      </label>
                      <select
                        value={formData.tempTicket?.currency || "USD"}
                        onChange={(e) => {
                          setFormData(prev => ({
                            ...prev,
                            tempTicket: { ...prev.tempTicket!, currency: e.target.value }
                          }));
                        }}
                        className="w-full px-4 py-3 bg-transparent border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] focus:border-[var(--app-accent)] focus:outline-none transition-colors"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="ETH">ETH</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--app-foreground)]">
                        Quantity Available *
                      </label>
                      <input
                        type="number"
                        placeholder="100"
                        value={formData.tempTicket?.quantity || ""}
                        onChange={(e) => {
                          setFormData(prev => ({
                            ...prev,
                            tempTicket: { ...prev.tempTicket!, quantity: parseInt(e.target.value) || 0 }
                          }));
                        }}
                        min="1"
                        className="w-full px-4 py-3 bg-transparent border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] focus:border-[var(--app-accent)] focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      if (formData.tempTicket?.type && formData.tempTicket?.price && formData.tempTicket?.quantity) {
                        const newTicket = {
                          type: formData.tempTicket.type.trim(),
                          price: formData.tempTicket.price,
                          currency: formData.tempTicket.currency || "USD",
                          quantity: formData.tempTicket.quantity,
                          perks: []
                        };
                        setFormData(prev => ({
                          ...prev,
                          tickets: {
                            ...prev.tickets,
                            types: [...prev.tickets.types, newTicket]
                          },
                          tempTicket: { type: "", price: 0, currency: "USD", quantity: 0, perks: [] }
                        }));
                      }
                    }}
                    className="w-full py-3"
                    icon={<Icon name="plus" size="sm" />}
                  >
                    Add Ticket Type
                  </Button>
                </div>
              )}

              {/* Ticket Tips */}
              <div className="p-4 bg-transparent border border-[var(--app-card-border)] rounded-lg">
                <h4 className="font-medium mb-2">💡 Tips for ticket pricing:</h4>
                <ul className="text-sm text-[var(--app-foreground-muted)] space-y-1">
                  <li>• Offer early bird discounts to encourage early registration</li>
                  <li>• Create VIP tiers with exclusive benefits</li>
                  <li>• Consider free tickets for speakers and sponsors</li>
                  <li>• Set realistic quantities based on venue capacity</li>
                  <li>• Price competitively within your market</li>
                </ul>
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center mb-8">Review & Create Event</h2>

              {/* Event Summary */}
              <div className="space-y-6 p-6 bg-transparent border border-[var(--app-card-border)] rounded-lg">
                <h3 className="text-xl font-semibold text-center mb-6">Event Summary</h3>

                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium border-b border-[var(--app-card-border)] pb-2">Basic Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-[var(--app-foreground-muted)]">Title:</span>
                      <p className="font-medium text-base">{formData.title || "Not set"}</p>
                    </div>
                    <div>
                      <span className="text-[var(--app-foreground-muted)]">Category:</span>
                      <p className="font-medium text-base">{formData.category || "Not set"}</p>
                    </div>
                    <div>
                      <span className="text-[var(--app-foreground-muted)]">Date:</span>
                      <p className="font-medium text-base">{formData.date || "Not set"}</p>
                    </div>
                    <div>
                      <span className="text-[var(--app-foreground-muted)]">Time:</span>
                      <p className="font-medium text-base">{formData.time || "Not set"}</p>
                    </div>
                    <div>
                      <span className="text-[var(--app-foreground-muted)]">Location:</span>
                      <p className="font-medium text-base">{formData.location || "Not set"}</p>
                    </div>
                    <div>
                      <span className="text-[var(--app-foreground-muted)]">Max Participants:</span>
                      <p className="font-medium text-base">{formData.maxParticipants}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="pt-4 border-t border-[var(--app-card-border)]">
                  <h4 className="text-lg font-medium mb-3">Description</h4>
                  <p className="text-sm bg-transparent border border-[var(--app-card-border)] rounded-lg p-3">
                    {formData.description || "No description provided"}
                  </p>
                </div>

                {/* Event Image */}
                {formData.image && (
                  <div className="pt-4 border-t border-[var(--app-card-border)]">
                    <h4 className="text-lg font-medium mb-3">Event Image</h4>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-20 bg-transparent border border-[var(--app-card-border)] rounded-lg flex items-center justify-center">
                        <Icon name="camera" size="lg" className="text-[var(--app-foreground-muted)]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-[var(--app-foreground-muted)] break-all">{formData.image}</p>
                        <p className="text-xs text-[var(--app-foreground-muted)] mt-1">Image URL</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Hosts */}
                <div className="pt-4 border-t border-[var(--app-card-border)]">
                  <h4 className="text-lg font-medium mb-3">Event Hosts</h4>
                  {formData.hosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {formData.hosts.map((host, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-transparent border border-[var(--app-card-border)] rounded-lg">
                          <div className="w-10 h-10 bg-[var(--app-accent)] rounded-full flex items-center justify-center">
                            <Icon name="users" size="sm" className="text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">@{host.name}</p>
                            <p className="text-xs text-[var(--app-foreground-muted)]">{host.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[var(--app-foreground-muted)] italic">No hosts added</p>
                  )}
                </div>

                {/* Agenda */}
                <div className="pt-4 border-t border-[var(--app-card-border)]">
                  <h4 className="text-lg font-medium mb-3">Event Agenda</h4>
                  {formData.agenda.length > 0 ? (
                    <div className="space-y-3">
                      {formData.agenda.map((item, index) => (
                        <div key={index} className="p-4 bg-transparent border border-[var(--app-card-border)] rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium text-base">{item.title}</h5>
                            <span className="text-sm text-[var(--app-accent)] font-medium">
                              {item.startTime} - {item.endTime}
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-sm text-[var(--app-foreground-muted)] mb-3">{item.description}</p>
                          )}
                          {item.speakers && item.speakers.length > 0 && (
                            <div className="flex items-center gap-2 text-xs text-[var(--app-foreground-muted)]">
                              <Icon name="users" size="sm" />
                              <span>Speakers: {item.speakers.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[var(--app-foreground-muted)] italic">No agenda items added</p>
                  )}
                </div>

                {/* Tickets */}
                <div className="pt-4 border-t border-[var(--app-card-border)]">
                  <h4 className="text-lg font-medium mb-3">Event Tickets</h4>
                  {formData.tickets.available ? (
                    formData.tickets.types.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {formData.tickets.types.map((ticket, index) => (
                          <div key={index} className="p-4 bg-transparent border border-[var(--app-card-border)] rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium text-base">{ticket.type}</h5>
                              <span className="text-sm text-[var(--app-accent)] font-medium">
                                {ticket.currency} {ticket.price}
                              </span>
                            </div>
                            <p className="text-sm text-[var(--app-foreground-muted)]">
                              {ticket.quantity} tickets available
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-[var(--app-foreground-muted)] italic">Tickets enabled but no types added</p>
                    )
                  ) : (
                    <p className="text-sm text-[var(--app-foreground-muted)] italic">No tickets for this event</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                className="w-full py-4 text-lg font-medium"
                icon={<Icon name="check" size="lg" />}
              >
                Create Event
              </Button>
            </div>
          )}
        </div>

      </div>

      {/* Static Navigation Buttons at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-[var(--app-background)] border-t border-[var(--app-card-border)] p-4 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Button
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            variant="outline"
            className="px-4 py-3 border-none bg-transparent hover:bg-black/10"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </Button>

          {currentStep < steps.length ? (
            <Button
              onClick={handleNextStep}
              className="px-4 py-3 border-none bg-transparent text-foreground hover:bg-black/10"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CreateEventForm;
