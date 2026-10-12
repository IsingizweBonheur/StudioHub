
import React, { useRef, useState } from "react";
import Navbar from "../layout/navbar";
import Breadcrumb from "../layout/breadcrumb";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  Eye,
  EyeOff,
  Globe,
  Image as ImageIcon,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Upload,
  UserRound,
  X,
} from "lucide-react";

const studioCategories = [
  "Photography",
  "Videography",
  "Graphic Design",
  "Web Design",
  "Software Development",
  "Interior Design",
  "Architecture",
  "Fashion Design",
  "Printing",
  "Digital Marketing",
  "Animation",
  "Other",
];

const studioTypes = [
  { value: "individual", label: "Individual Studio" },
  { value: "company", label: "Registered Company" },
  { value: "agency", label: "Creative Agency" },
  { value: "freelance", label: "Freelance Team" },
];

const initialForm = {
  studioName: "",
  studioType: "",
  categories: [],
  description: "",
  ownerName: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  password: "",
  confirmPassword: "",
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

function Field({
  label,
  htmlFor,
  required = false,
  error,
  hint,
  children,
}) {
  return (
    <div className="min-w-0 space-y-2">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-semibold text-slate-700"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {children}

      {hint && !error && (
        <p className="text-xs leading-5 text-slate-500">{hint}</p>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

function SectionHeading({ icon: Icon, title, description }) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={21} />
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function LogoUpload({ logo, setLogo, error }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      window.alert("Please select an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      window.alert("Please choose an image smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    setLogo({
      file,
      preview: URL.createObjectURL(file),
    });
  };

  const removeLogo = () => {
    if (logo?.preview) {
      URL.revokeObjectURL(logo.preview);
    }

    setLogo(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-w-0">
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="text-sm font-semibold text-slate-700">
          Studio Logo
        </label>
        <span className="text-xs text-slate-400">Optional</span>
      </div>

      <div className="flex flex-col items-start gap-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {logo?.preview ? (
            <img
              src={logo.preview}
              alt="Studio logo preview"
              className="h-full w-full object-contain"
            />
          ) : (
            <ImageIcon size={32} className="text-slate-300" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-slate-800">
            Upload your studio logo
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Use a clear PNG, JPG, or WebP image. Maximum file size: 5 MB.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Upload size={16} />
              {logo ? "Change logo" : "Choose image"}
            </button>

            {logo && (
              <button
                type="button"
                onClick={removeLogo}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                Remove
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function SuccessModal({ studioName, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
    >
      <div className="relative my-auto w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-2xl sm:p-9">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close success message"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={20} />
        </button>

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={42} strokeWidth={1.8} />
        </div>

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
          Registration complete
        </p>

        <h2
          id="success-title"
          className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl"
        >
          Welcome to StudioHub!
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-500">
          Your registration form for{" "}
          <span className="font-semibold text-slate-800">
            {studioName || "your studio"}
          </span>{" "}
          has been completed successfully.
        </p>

        <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-left">
          <div className="flex items-start gap-3">
            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0 text-emerald-600"
            />
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Your details are ready
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                This is a frontend demonstration. Connect your registration
                form to a backend and database to save studio details and
                create accounts permanently.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          Continue
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}

export default function Register() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [logo, setLogo] = useState(null);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const steps = [
    { title: "Studio details", description: "Tell us about your studio" },
    { title: "Contact details", description: "How clients can reach you" },
    { title: "Create account", description: "Set up your login details" },
  ];

  const updateField = (name, value) => {
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
      form: "",
    }));
  };

  const toggleCategory = (category) => {
    setForm((previous) => {
      const selected = previous.categories.includes(category);

      return {
        ...previous,
        categories: selected
          ? previous.categories.filter((item) => item !== category)
          : [...previous.categories, category],
      };
    });

    setErrors((previous) => ({
      ...previous,
      categories: "",
    }));
  };

  const validateStep = (step) => {
    const nextErrors = {};

    if (step === 0) {
      if (!form.studioName.trim()) {
        nextErrors.studioName = "Studio name is required.";
      }

      if (!form.studioType) {
        nextErrors.studioType = "Please select a studio type.";
      }

      if (form.categories.length === 0) {
        nextErrors.categories = "Select at least one category.";
      }

      if (form.description.trim().length > 500) {
        nextErrors.description = "Description must be 500 characters or fewer.";
      }
    }

    if (step === 1) {
      if (!form.ownerName.trim()) {
        nextErrors.ownerName = "Contact person's name is required.";
      }

      if (!form.email.trim()) {
        nextErrors.email = "Email address is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        nextErrors.email = "Enter a valid email address.";
      }

      if (!form.phone.trim()) {
        nextErrors.phone = "Phone number is required.";
      } else if (form.phone.trim().replace(/[\s()+-]/g, "").length < 9) {
        nextErrors.phone = "Enter a valid phone number.";
      }

      if (!form.location.trim()) {
        nextErrors.location = "Studio location is required.";
      }

      if (
        form.website.trim() &&
        !/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i.test(
          form.website.trim()
        )
      ) {
        nextErrors.website =
          "Enter a valid website, such as https://example.com.";
      }
    }

    if (step === 2) {
      if (!form.password) {
        nextErrors.password = "Password is required.";
      } else if (form.password.length < 8) {
        nextErrors.password = "Use at least 8 characters.";
      }

      if (!form.confirmPassword) {
        nextErrors.confirmPassword = "Please confirm your password.";
      } else if (form.password !== form.confirmPassword) {
        nextErrors.confirmPassword = "Passwords do not match.";
      }

      if (!acceptedTerms) {
        nextErrors.terms = "You must accept the terms to continue.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;

    setCurrentStep((previous) => Math.min(previous + 1, steps.length - 1));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((previous) => Math.max(previous - 1, 0));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateStep(2)) return;

    // Frontend demonstration only.
    // Send form data to your backend API here when it is available.
    setShowSuccess(true);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    setForm(initialForm);
    setLogo(null);
    setErrors({});
    setAcceptedTerms(false);
    setCurrentStep(0);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <Breadcrumb />
        </div>
      </div>

      <main className="w-full px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12 xl:px-14">
        <div className="mx-auto w-full max-w-[1600px]">
          {/* Page heading */}
          <div className="mb-8 flex flex-col justify-between gap-5 lg:mb-10 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                <Sparkles size={14} />
                JOIN STUDIOHUB
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                Register your studio
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                Create your studio profile, showcase your services, and make it
                easier for clients to discover your work.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:w-fit">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <LockKeyhole size={20} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Secure registration
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Your details stay private
                </p>
              </div>
            </div>
          </div>

          {/* Progress steps */}
          <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {steps.map((step, index) => {
              const isComplete = index < currentStep;
              const isActive = index === currentStep;

              return (
                <div
                  key={step.title}
                  className={`flex min-w-0 items-center gap-3 rounded-2xl border p-4 transition sm:p-5 ${
                    isActive
                      ? "border-blue-200 bg-blue-50/70 shadow-sm"
                      : isComplete
                        ? "border-emerald-200 bg-emerald-50/60"
                        : "border-slate-200 bg-white"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      isComplete
                        ? "bg-emerald-600 text-white"
                        : isActive
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {isComplete ? <Check size={20} /> : `0${index + 1}`}
                  </div>

                  <div className="min-w-0">
                    <p
                      className={`text-sm font-bold ${
                        isActive ? "text-blue-800" : "text-slate-800"
                      }`}
                    >
                      {step.title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Registration form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            {/* Form header */}
            <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-5 sm:px-8 sm:py-6 md:flex-row md:items-center lg:px-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                  Step {currentStep + 1} of {steps.length}
                </p>

                <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                  {steps[currentStep].title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Fields marked with{" "}
                  <span className="font-bold text-red-500">*</span> are
                  required.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 md:self-center">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                {Math.round(((currentStep + 1) / steps.length) * 100)}% complete
              </div>
            </div>

            <div className="space-y-8 px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
              {/* STEP 1 */}
              {currentStep === 0 && (
                <div className="space-y-8">
                  <section>
                    <SectionHeading
                      icon={Building2}
                      title="Studio information"
                      description="Introduce your studio and select the services you offer."
                    />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                      <Field
                        label="Studio name"
                        htmlFor="studioName"
                        required
                        error={errors.studioName}
                      >
                        <div className="relative">
                          <Building2
                            size={18}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            id="studioName"
                            name="studioName"
                            type="text"
                            autoComplete="organization"
                            placeholder="e.g. Bonheur Creative Studio"
                            value={form.studioName}
                            onChange={(event) =>
                              updateField("studioName", event.target.value)
                            }
                            className={`${inputClass} pl-11`}
                          />
                        </div>
                      </Field>

                      <Field
                        label="Studio type"
                        htmlFor="studioType"
                        required
                        error={errors.studioType}
                      >
                        <div className="relative">
                          <select
                            id="studioType"
                            name="studioType"
                            value={form.studioType}
                            onChange={(event) =>
                              updateField("studioType", event.target.value)
                            }
                            className={`${inputClass} appearance-none pr-10 ${
                              form.studioType ? "" : "text-slate-400"
                            }`}
                          >
                            <option value="">Select studio type</option>

                            {studioTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>

                          <ChevronDown
                            size={17}
                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                          />
                        </div>
                      </Field>

                      <Field
                        label="Short description"
                        htmlFor="description"
                        hint={`${form.description.length}/500 characters`}
                        error={errors.description}
                      >
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          maxLength={500}
                          placeholder="Describe your studio and what makes it unique..."
                          value={form.description}
                          onChange={(event) =>
                            updateField("description", event.target.value)
                          }
                          className={`${inputClass} resize-y`}
                        />
                      </Field>
                    </div>
                  </section>

                  <section className="border-t border-slate-100 pt-8">
                    <SectionHeading
                      icon={Sparkles}
                      title="Studio categories"
                      description="Select all categories that describe your studio's services."
                    />

                    <div
                      className={`grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
                        errors.categories
                          ? "rounded-xl ring-1 ring-red-200"
                          : ""
                      }`}
                    >
                      {studioCategories.map((category) => {
                        const selected = form.categories.includes(category);

                        return (
                          <button
                            key={category}
                            type="button"
                            onClick={() => toggleCategory(category)}
                            aria-pressed={selected}
                            className={`flex min-h-[54px] items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                              selected
                                ? "border-blue-300 bg-blue-50 text-blue-800 ring-2 ring-blue-500/10"
                                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            <span>{category}</span>

                            <span
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                                selected
                                  ? "border-blue-600 bg-blue-600 text-white"
                                  : "border-slate-300 bg-white"
                              }`}
                            >
                              {selected && <Check size={13} />}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {errors.categories && (
                      <p className="mt-2 text-xs text-red-600">
                        {errors.categories}
                      </p>
                    )}
                  </section>

                  <section className="border-t border-slate-100 pt-8">
                    <SectionHeading
                      icon={Camera}
                      title="Studio branding"
                      description="Add your logo so clients can recognize your studio."
                    />

                    <LogoUpload logo={logo} setLogo={setLogo} />
                  </section>
                </div>
              )}

              {/* STEP 2 */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <section>
                    <SectionHeading
                      icon={UserRound}
                      title="Contact person"
                      description="Provide the main contact for this studio."
                    />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                      <Field
                        label="Full name"
                        htmlFor="ownerName"
                        required
                        error={errors.ownerName}
                      >
                        <div className="relative">
                          <UserRound
                            size={18}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            id="ownerName"
                            name="ownerName"
                            type="text"
                            autoComplete="name"
                            placeholder="Enter contact person's name"
                            value={form.ownerName}
                            onChange={(event) =>
                              updateField("ownerName", event.target.value)
                            }
                            className={`${inputClass} pl-11`}
                          />
                        </div>
                      </Field>

                      <Field
                        label="Email address"
                        htmlFor="email"
                        required
                        error={errors.email}
                      >
                        <div className="relative">
                          <Mail
                            size={18}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={(event) =>
                              updateField("email", event.target.value)
                            }
                            className={`${inputClass} pl-11`}
                          />
                        </div>
                      </Field>

                      <Field
                        label="Phone number"
                        htmlFor="phone"
                        required
                        error={errors.phone}
                        hint="Include your country code when necessary."
                      >
                        <div className="relative">
                          <Phone
                            size={18}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="+250 7XX XXX XXX"
                            value={form.phone}
                            onChange={(event) =>
                              updateField("phone", event.target.value)
                            }
                            className={`${inputClass} pl-11`}
                          />
                        </div>
                      </Field>
                    </div>
                  </section>

                  <section className="border-t border-slate-100 pt-8">
                    <SectionHeading
                      icon={MapPin}
                      title="Location and online presence"
                      description="Help clients find your studio in person or online."
                    />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <Field
                        label="Studio location"
                        htmlFor="location"
                        required
                        error={errors.location}
                        hint="Enter your city, district, or full studio address."
                      >
                        <div className="relative">
                          <MapPin
                            size={18}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            id="location"
                            name="location"
                            type="text"
                            autoComplete="street-address"
                            placeholder="e.g. Kigali, Gasabo"
                            value={form.location}
                            onChange={(event) =>
                              updateField("location", event.target.value)
                            }
                            className={`${inputClass} pl-11`}
                          />
                        </div>
                      </Field>

                      <Field
                        label="Website"
                        htmlFor="website"
                        hint="Optional. Include your portfolio or business website."
                        error={errors.website}
                      >
                        <div className="relative">
                          <Globe
                            size={18}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            id="website"
                            name="website"
                            type="text"
                            inputMode="url"
                            autoComplete="url"
                            placeholder="https://yourstudio.com"
                            value={form.website}
                            onChange={(event) =>
                              updateField("website", event.target.value)
                            }
                            className={`${inputClass} pl-11`}
                          />
                        </div>
                      </Field>
                    </div>
                  </section>
                </div>
              )}

              {/* STEP 3 */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <section>
                    <SectionHeading
                      icon={LockKeyhole}
                      title="Create your account"
                      description="Choose a password to protect your StudioHub account."
                    />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <Field
                        label="Password"
                        htmlFor="password"
                        required
                        error={errors.password}
                        hint="Use at least 8 characters."
                      >
                        <div className="relative">
                          <LockKeyhole
                            size={18}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="Create a strong password"
                            value={form.password}
                            onChange={(event) =>
                              updateField("password", event.target.value)
                            }
                            className={`${inputClass} pl-11 pr-12`}
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowPassword((previous) => !previous)
                            }
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </Field>

                      <Field
                        label="Confirm password"
                        htmlFor="confirmPassword"
                        required
                        error={errors.confirmPassword}
                      >
                        <div className="relative">
                          <LockKeyhole
                            size={18}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="Enter your password again"
                            value={form.confirmPassword}
                            onChange={(event) =>
                              updateField(
                                "confirmPassword",
                                event.target.value
                              )
                            }
                            className={`${inputClass} pl-11 pr-12`}
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(
                                (previous) => !previous
                              )
                            }
                            aria-label={
                              showConfirmPassword
                                ? "Hide confirm password"
                                : "Show confirm password"
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </Field>
                    </div>
                  </section>

                  {/* Registration summary */}
                  <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                    <h3 className="font-bold text-slate-900">
                      Review your studio
                    </h3>

                    <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start">
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white">
                        {logo?.preview ? (
                          <img
                            src={logo.preview}
                            alt="Studio logo"
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <Building2
                            size={30}
                            className="text-slate-300"
                          />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="break-words text-lg font-bold text-slate-900">
                          {form.studioName || "Your studio name"}
                        </h4>

                        <p className="mt-1 text-sm text-slate-500">
                          {studioTypes.find(
                            (type) => type.value === form.studioType
                          )?.label || "Studio type not selected"}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {form.categories.map((category) => (
                            <span
                              key={category}
                              className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                            >
                              {category}
                            </span>
                          ))}

                          {form.categories.length === 0 && (
                            <span className="text-xs text-slate-400">
                              No categories selected
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4 border-t border-slate-200 pt-5 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="flex min-w-0 items-start gap-2.5">
                        <Mail
                          size={17}
                          className="mt-0.5 shrink-0 text-slate-400"
                        />
                        <span className="break-all text-sm text-slate-600">
                          {form.email || "No email provided"}
                        </span>
                      </div>

                      <div className="flex min-w-0 items-start gap-2.5">
                        <Phone
                          size={17}
                          className="mt-0.5 shrink-0 text-slate-400"
                        />
                        <span className="break-words text-sm text-slate-600">
                          {form.phone || "No phone provided"}
                        </span>
                      </div>

                      <div className="flex min-w-0 items-start gap-2.5">
                        <MapPin
                          size={17}
                          className="mt-0.5 shrink-0 text-slate-400"
                        />
                        <span className="break-words text-sm text-slate-600">
                          {form.location || "No location provided"}
                        </span>
                      </div>
                    </div>
                  </section>

                  <div>
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(event) => {
                          setAcceptedTerms(event.target.checked);
                          setErrors((previous) => ({
                            ...previous,
                            terms: "",
                          }));
                        }}
                        className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 accent-blue-600"
                      />

                      <span className="text-sm leading-6 text-slate-600">
                        I confirm that the information provided is accurate
                        and agree to the StudioHub terms and privacy policy.
                      </span>
                    </label>

                    {errors.terms && (
                      <p className="mt-2 text-xs text-red-600">
                        {errors.terms}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft size={17} />
                {currentStep === 0 ? "Previous" : "Back"}
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Continue
                  <ArrowRight size={17} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
                >
                  <CheckCircle2 size={18} />
                  Complete registration
                </button>
              )}
            </div>
          </form>

          <p className="mt-5 text-center text-xs leading-6 text-slate-400">
            StudioHub · Connect your studio with the right clients.
          </p>
        </div>
      </main>

      {showSuccess && (
        <SuccessModal
          studioName={form.studioName}
          onClose={closeSuccess}
        />
      )}
    </div>
  );
}
