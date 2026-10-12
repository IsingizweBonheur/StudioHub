import { useEffect, useState } from "react";
import Navbar from "../layout/navbar";
import Breadcrumb from "../layout/breadcrumb";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronDown,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Upload,
  UserRound,
  X,
} from "lucide-react";

const categories = [
  "Photography",
  "Videography",
  "Graphic Design",
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Branding & Logo Design",
  "Music Production",
  "Audio Recording",
  "Digital Marketing",
  "Social Media Management",
  "Content Creation",
  "Animation & Motion Graphics",
  "Fashion & Styling",
  "Event Planning",
  "Printing & Publishing",
  "Interior Design",
  "Other",
];

const studioTypes = [
  "Individual / Freelancer",
  "Small Studio",
  "Medium Business",
  "Large Agency",
];

const steps = [
  { title: "Studio Details", icon: Building2 },
  { title: "Contact Info", icon: UserRound },
  { title: "Account Security", icon: ShieldCheck },
];

const initialValues = {
  studioName: "",
  category: [],
  studioType: "",
  location: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const stepFields = [
  ["studioName", "studioType", "category"],
  ["location", "phone", "email"],
  ["password", "confirmPassword"],
];

const errorMessages = {
  studioName: "Enter a studio name with at least 2 characters.",
  category: "Select at least one service.",
  studioType: "Select your studio type.",
  location: "Enter your studio location.",
  phone: "Enter a valid phone number.",
  email: "Enter a valid email address.",
  password: "Use at least 8 characters, including a letter and a number.",
  confirmPassword: "Your passwords must match.",
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

function isValid(field, values) {
  const rules = {
    studioName: values.studioName.trim().length >= 2,
    category: values.category.length > 0,
    studioType: Boolean(values.studioType),
    location: values.location.trim().length >= 2,
    phone: /^\+?[0-9\s()-]{9,20}$/.test(values.phone.trim()),
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()),
    password:
      values.password.length >= 8 &&
      /[A-Za-z]/.test(values.password) &&
      /\d/.test(values.password),
    confirmPassword:
      Boolean(values.password) &&
      values.confirmPassword === values.password,
  };

  return rules[field];
}

function Field({ label, error, hint, children }) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
        <span className="ml-1 text-red-500">*</span>
      </label>

      {children}

      {error ? (
        <p role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-xs leading-5 text-slate-400">{hint}</p>
      )}
    </div>
  );
}

function LogoUpload({ logo, setLogo }) {
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!logo) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(logo);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [logo]);

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setError("Choose a PNG, JPG, or WEBP image.");
    } else if (file.size > 5 * 1024 * 1024) {
      setError("The logo must be smaller than 5 MB.");
    } else {
      setLogo(file);
      setError("");
    }

    event.target.value = "";
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Studio Logo <span className="text-slate-400">(optional)</span>
      </label>

      <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 transition hover:border-blue-400 hover:bg-blue-50/50">
        {preview ? (
          <img
            src={preview}
            alt="Studio logo preview"
            className="h-14 w-14 rounded-lg border border-slate-200 bg-white object-contain p-1"
          />
        ) : (
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <Upload size={23} />
          </span>
        )}

        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-slate-700">
            {logo ? logo.name : "Upload your studio logo"}
          </span>
          <span className="mt-1 block text-xs text-slate-400">
            PNG, JPG or WEBP · Maximum 5 MB
          </span>
        </span>

        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="sr-only"
          onChange={handleFile}
        />
      </label>

      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function SuccessModal({ onClose, studioName, categories }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="ml-auto flex text-slate-400 transition hover:text-slate-700"
        >
          <X size={20} />
        </button>

        <div className="mx-auto mt-1 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={38} />
        </div>

        <h2
          id="success-title"
          className="mt-5 text-center text-2xl font-bold text-slate-900"
        >
          Registration completed!
        </h2>

        <p className="mt-3 text-center text-sm leading-6 text-slate-500">
          The registration form for{" "}
          <strong className="text-slate-800">{studioName}</strong> has been
          completed successfully.
        </p>

        <div className="mt-5 rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Selected services
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
        >
          <Check size={18} />
          Finish
        </button>
      </div>
    </div>
  );
}

export default function Register() {
  const [values, setValues] = useState(initialValues);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [logo, setLogo] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const updateField = (name, value) => {
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
  };

  const validateStep = (step) => {
    const invalidFields = stepFields[step].filter(
      (field) => !isValid(field, values)
    );

    setErrors((previous) => {
      const next = { ...previous };
      stepFields[step].forEach((field) => delete next[field]);

      invalidFields.forEach((field) => {
        next[field] = errorMessages[field];
      });

      return next;
    });

    return invalidFields.length === 0;
  };

  const stepComplete = (step) =>
    stepFields[step].every((field) => isValid(field, values));

  const goToStep = (target) => {
    if (target <= currentStep) {
      setCurrentStep(target);
      setErrors({});
      return;
    }

    for (let step = 0; step < target; step++) {
      if (!validateStep(step)) {
        setCurrentStep(step);
        return;
      }
    }

    setErrors({});
    setCurrentStep(target);
  };

  const goNext = () => {
    if (!validateStep(currentStep)) return;

    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
    setErrors({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    for (let step = 0; step < stepFields.length; step++) {
      if (!validateStep(step)) {
        setCurrentStep(step);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }

    setShowSuccess(true);
  };

  return (
    <>
      <Navbar />

      <div className="sticky top-16 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
        <Breadcrumb
          title="Studio Registration"
          paths={[
            { label: "Home", link: "/" },
            { label: "Studio Registration", link: "/register" },
          ]}
        />
      </div>

      <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center justify-between gap-3">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-blue-600"
            >
              <ArrowLeft size={16} />
              Home
            </a>

            <p className="text-right text-xs text-slate-500 sm:text-sm">
              Already registered?{" "}
              <a
                href="/login"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Sign in
              </a>
            </p>
          </div>

          <header className="mb-8">
            <div className="mb-3 flex items-center gap-2 text-blue-600">
              <Building2 size={26} />
              <span className="text-xl font-extrabold">
                Studio<span className="text-slate-900">Hub</span>
              </span>
            </div>

            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              StudioHub Registration
            </p>

            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Create your studio account
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
              Enter your studio details and contact information to get started.
            </p>
          </header>

          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="grid grid-cols-3">
              {steps.map(({ title, icon: Icon }, index) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => goToStep(index)}
                  aria-current={currentStep === index ? "step" : undefined}
                  className="flex min-w-0 flex-col items-center text-center"
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition sm:h-11 sm:w-11 ${
                      stepComplete(index)
                        ? "border-blue-600 bg-blue-600 text-white"
                        : currentStep === index
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-slate-200 text-slate-400"
                    }`}
                  >
                    {stepComplete(index) ? <Check size={19} /> : <Icon size={19} />}
                  </span>

                  <span
                    className={`mt-2 text-[10px] font-semibold sm:text-sm ${
                      currentStep === index || stepComplete(index)
                        ? "text-blue-700"
                        : "text-slate-400"
                    }`}
                  >
                    {title}
                  </span>
                </button>
              ))}
            </div>

            <div
              className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-100"
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={3}
              aria-valuenow={currentStep + 1}
            >
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / 3) * 100}%` }}
              />
            </div>
          </section>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5 sm:px-8">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                {(() => {
                  const Icon = steps[currentStep].icon;
                  return <Icon size={22} />;
                })()}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="font-bold sm:text-lg">
                  {steps[currentStep].title}
                </h2>
                <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                  {
                    [
                      "Tell us about your studio and services.",
                      "Provide your location and business contact details.",
                      "Create a secure password for your account.",
                    ][currentStep]
                  }
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700 sm:text-xs">
                Step {currentStep + 1} of 3
              </span>
            </div>

            <div className="space-y-6 px-5 py-6 sm:px-8 sm:py-8">
              {currentStep === 0 && (
                <>
                  <Field label="Studio Name" error={errors.studioName}>
                    <div className="relative">
                      <Building2
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="text"
                        autoComplete="organization"
                        value={values.studioName}
                        placeholder="e.g. Bonheur Creative Studio"
                        onChange={(e) =>
                          updateField("studioName", e.target.value)
                        }
                        aria-invalid={Boolean(errors.studioName)}
                        className={inputClass}
                      />
                    </div>
                  </Field>

                  <Field
                    label="Studio Type"
                    error={errors.studioType}
                    hint="Choose the option that best describes your business."
                  >
                    <div className="relative">
                      <BriefcaseBusiness
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <select
                        value={values.studioType}
                        onChange={(e) =>
                          updateField("studioType", e.target.value)
                        }
                        aria-invalid={Boolean(errors.studioType)}
                        className={`${inputClass} appearance-none pr-10`}
                      >
                        <option value="">Select studio type</option>
                        {studioTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </Field>

                  <Field
                    label="Studio Categories"
                    error={errors.category}
                    hint="Select all services your studio provides."
                  >
                    <div
                      className={`grid grid-cols-1 gap-2 rounded-xl border p-3 sm:grid-cols-2 ${
                        errors.category ? "border-red-300" : "border-slate-200"
                      }`}
                    >
                      {categories.map((category) => {
                        const selected = values.category.includes(category);

                        return (
                          <label
                            key={category}
                            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition ${
                              selected
                                ? "border-blue-300 bg-blue-50 text-blue-800"
                                : "border-transparent bg-slate-50 text-slate-600 hover:border-slate-200 hover:bg-white"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selected}
                              onChange={(e) =>
                                updateField(
                                  "category",
                                  e.target.checked
                                    ? [...values.category, category]
                                    : values.category.filter(
                                        (item) => item !== category
                                      )
                                )
                              }
                              className="h-4 w-4 shrink-0 accent-blue-600"
                            />

                            <span className="flex-1 font-medium">
                              {category}
                            </span>

                            {selected && (
                              <CheckCircle2
                                size={17}
                                className="text-blue-600"
                              />
                            )}
                          </label>
                        );
                      })}
                    </div>

                    {values.category.length > 0 && (
                      <p className="mt-2 text-xs font-semibold text-blue-600">
                        {values.category.length} service
                        {values.category.length === 1 ? "" : "s"} selected
                      </p>
                    )}
                  </Field>

                  <LogoUpload logo={logo} setLogo={setLogo} />
                </>
              )}

              {currentStep === 1 && (
                <>
                  <Field
                    label="Studio Location"
                    error={errors.location}
                    hint="Enter your city, district, or neighborhood."
                  >
                    <div className="relative">
                      <MapPin
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="text"
                        autoComplete="address-level2"
                        value={values.location}
                        placeholder="e.g. Kigali, Gasabo"
                        onChange={(e) =>
                          updateField("location", e.target.value)
                        }
                        aria-invalid={Boolean(errors.location)}
                        className={inputClass}
                      />
                    </div>
                  </Field>

                  <Field
                    label="Phone Number"
                    error={errors.phone}
                    hint="Include your country code if applicable."
                  >
                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="tel"
                        autoComplete="tel"
                        value={values.phone}
                        placeholder="e.g. +250 788 000 000"
                        onChange={(e) => updateField("phone", e.target.value)}
                        aria-invalid={Boolean(errors.phone)}
                        className={inputClass}
                      />
                    </div>
                  </Field>

                  <Field
                    label="Business Email"
                    error={errors.email}
                    hint="Use an email address you can access."
                  >
                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        placeholder="studio@example.com"
                        onChange={(e) => updateField("email", e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        className={inputClass}
                      />
                    </div>
                  </Field>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <Field
                    label="Password"
                    error={errors.password}
                    hint="At least 8 characters, including a letter and a number."
                  >
                    <div className="relative">
                      <LockKeyhole
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        value={values.password}
                        placeholder="Create a strong password"
                        onChange={(e) =>
                          updateField("password", e.target.value)
                        }
                        aria-invalid={Boolean(errors.password)}
                        className={`${inputClass} pr-12`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </Field>

                  <Field
                    label="Confirm Password"
                    error={errors.confirmPassword}
                  >
                    <div className="relative">
                      <LockKeyhole
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        value={values.confirmPassword}
                        placeholder="Enter your password again"
                        onChange={(e) =>
                          updateField("confirmPassword", e.target.value)
                        }
                        aria-invalid={Boolean(errors.confirmPassword)}
                        className={`${inputClass} pr-12`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword((value) => !value)
                        }
                        aria-label={
                          showConfirmPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </Field>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <ShieldCheck size={20} className="text-emerald-600" />
                      Password requirements
                    </div>

                    <div className="mt-3 space-y-2">
                      {[
                        [values.password.length >= 8, "At least 8 characters"],
                        [/[A-Za-z]/.test(values.password), "Contains a letter"],
                        [/\d/.test(values.password), "Contains a number"],
                      ].map(([passed, text]) => (
                        <p
                          key={text}
                          className={`flex items-center gap-2 text-xs ${
                            passed ? "text-emerald-600" : "text-slate-400"
                          }`}
                        >
                          <CheckCircle2 size={15} />
                          {text}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <h3 className="text-sm font-bold text-slate-800">
                      Review your studio
                    </h3>

                    <div className="mt-4 space-y-3 text-sm">
                      {[
                        ["Studio", values.studioName],
                        ["Type", values.studioType],
                        ["Location", values.location],
                        ["Email", values.email],
                        ["Phone", values.phone],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="flex items-start justify-between gap-4"
                        >
                          <span className="text-slate-500">{label}</span>
                          <span className="break-words text-right font-medium text-slate-800">
                            {value || "—"}
                          </span>
                        </div>
                      ))}

                      <div className="border-t border-slate-200 pt-3">
                        <p className="mb-2 text-slate-500">
                          Selected services
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {values.category.map((category) => (
                            <span
                              key={category}
                              className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>

                      {logo && (
                        <p className="text-xs text-slate-500">
                          Logo: {logo.name}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-5 sm:px-8">
              <button
                type="button"
                onClick={goBack}
                disabled={currentStep === 0}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 disabled:invisible"
              >
                <ArrowLeft size={16} />
                Back
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                >
                  Next Step
                  <ArrowRight size={17} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                >
                  Complete Registration
                  <CheckCircle2 size={17} />
                </button>
              )}
            </div>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400">
            StudioHub · Connect · Create · Grow
          </p>
        </div>
      </main>

      {showSuccess && (
        <SuccessModal
          studioName={values.studioName.trim()}
          categories={values.category}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </>
  );
}
