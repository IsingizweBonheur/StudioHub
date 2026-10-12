
import { useEffect, useState } from "react";
import Navbar from "../layout/navbar";
import Breadcrumb from "../layout/breadcrumb";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
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
  Sparkles,
  Tag,
  UserRound,
  Users,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Upload,
} from "lucide-react";

// Studio categories: studios can select multiple services.
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

const steps = [
  { title: "Studio Details", icon: Building2 },
  { title: "Contact Info", icon: UserRound },
  { title: "Account Security", icon: ShieldCheck },
];

// Reusable label
function Label({ children, required = true }) {
  return (
    <label className="mb-2 block text-sm font-semibold text-slate-700">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

// Reusable form field
function Field({ label, error, hint, children }) {
  return (
    <div className="min-w-0">
      <Label>{label}</Label>
      {children}

      {error && (
        <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}

      {!error && hint && (
        <p className="mt-1.5 text-xs leading-5 text-slate-400">
          {hint}
        </p>
      )}
    </div>
  );
}

// Reusable input styles
function inputClass(disabled = false, hasIcon = true) {
  return `w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
    hasIcon ? "pl-11" : ""
  } ${
    disabled
      ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
      : "border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
  }`;
}

// Studio logo upload with preview URL cleanup
function LogoUpload({ logo, setLogo, error, setError }) {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!logo) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(logo);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [logo]);

  const handleFile = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a PNG, JPG, or WEBP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Your logo must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    setError("");
    setLogo(file);
    event.target.value = "";
  };

  return (
    <div className="max-w-md">
      <Label required={false}>Studio Logo</Label>

      <label className="group flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-5 text-center transition hover:border-blue-400 hover:bg-blue-50/50">
        {logo && preview ? (
          <>
            <img
              src={preview}
              alt="Selected studio logo preview"
              className="mb-3 h-16 w-16 rounded-xl border border-slate-200 bg-white object-contain p-1"
            />

            <span className="max-w-full truncate text-sm font-semibold text-slate-700">
              {logo.name}
            </span>

            <span className="mt-1 text-xs text-blue-600">
              Click to change logo
            </span>
          </>
        ) : (
          <>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-100">
              <Upload size={22} />
            </div>

            <span className="text-sm font-semibold text-slate-700">
              Upload your studio logo
            </span>

            <span className="mt-1 text-xs text-slate-400">
              PNG, JPG or WEBP · Maximum 5 MB
            </span>
          </>
        )}

        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="sr-only"
          onChange={handleFile}
        />
      </label>

      {error && (
        <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

// Registration success modal
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
        className="w-full max-w-md animate-[modalIn_.25s_ease-out] rounded-3xl bg-white p-7 text-center shadow-2xl sm:p-9"
      >
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
            <Check size={32} strokeWidth={3} />
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
          <Sparkles size={14} />
          Form completed
        </span>

        <h2
          id="success-title"
          className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900"
        >
          Congratulations!
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          You have completed the StudioHub registration form for{" "}
          <span className="font-semibold text-slate-800">
            {studioName}
          </span>.
        </p>

        <div className="mt-5 rounded-xl bg-slate-50 p-4 text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Selected services
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-medium text-blue-700"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
        >
          <CheckCircle2 size={18} />
          Finish
        </button>

        <p className="mt-4 text-xs text-slate-400">
          StudioHub · Connect · Create · Grow
        </p>
      </div>
    </div>
  );
}

export default function Register() {
  const [values, setValues] = useState(initialValues);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [logo, setLogo] = useState(null);
  const [logoError, setLogoError] = useState("");
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const valid = {
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
      values.password.length >= 8 &&
      values.confirmPassword === values.password,
  };

  const fieldOrder = [
    "studioName",
    "category",
    "studioType",
    "location",
    "phone",
    "email",
    "password",
    "confirmPassword",
  ];

  const stepFields = [
    ["studioName", "category", "studioType"],
    ["location", "phone", "email"],
    ["password", "confirmPassword"],
  ];

  const getError = (field) => {
    const messages = {
      studioName: "Enter a studio name with at least 2 characters.",
      category: "Select at least one studio service.",
      studioType: "Please select your studio type.",
      location: "Enter your studio location.",
      phone: "Enter a valid phone number.",
      email: "Enter a valid email address.",
      password:
        "Use at least 8 characters, including a letter and a number.",
      confirmPassword: "Your passwords must match.",
    };

    return messages[field] || "Please complete this field.";
  };

  const updateField = (name, value) => {
    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  // Prevent users from skipping incomplete earlier fields.
  const isUnlocked = (field) => {
    const index = fieldOrder.indexOf(field);

    if (index <= 0) return true;

    return fieldOrder
      .slice(0, index)
      .every((previousField) => valid[previousField]);
  };

  const stepComplete = (step) =>
    stepFields[step].every((field) => valid[field]);

  const validateStep = (step) => {
    const invalidFields = stepFields[step].filter(
      (field) => !valid[field]
    );

    if (invalidFields.length === 0) return true;

    setErrors((previous) => {
      const nextErrors = { ...previous };

      invalidFields.forEach((field) => {
        nextErrors[field] = getError(field);
      });

      return nextErrors;
    });

    return false;
  };

  const goNext = () => {
    if (!validateStep(currentStep)) return;

    setErrors({});
    setCurrentStep((previous) => Math.min(previous + 1, 2));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goBack = () => {
    setCurrentStep((previous) => Math.max(previous - 1, 0));
    setErrors({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateStep(0) || !validateStep(1) || !validateStep(2)) {
      const firstInvalidStep = stepFields.findIndex((fields) =>
        fields.some((field) => !valid[field])
      );

      setCurrentStep(firstInvalidStep === -1 ? 0 : firstInvalidStep);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setShowSuccess(true);
  };

  const goToStep = (index) => {
    if (index <= currentStep) {
      setCurrentStep(index);
      setErrors({});
      return;
    }

    for (let step = 0; step < index; step += 1) {
      if (!validateStep(step)) {
        setCurrentStep(step);
        return;
      }
    }

    setErrors({});
    setCurrentStep(index);
  };

  return (
    <>
      <Navbar />

      {/* Sticky breadcrumb: adjust top-16 to match your navbar height. */}
      <div className="sticky top-16 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
        <Breadcrumb
          title="Studio Registration"
          paths={[
            { label: "Home", link: "/" },
            { label: "Studio Registration", link: "/register" },
          ]}
        />
      </div>

      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[380px_minmax(0,1fr)]">

          {/* Desktop branding panel */}
          <aside className="relative hidden overflow-hidden bg-[#071d49] p-8 text-white lg:flex lg:flex-col xl:p-10">
            <div className="pointer-events-none absolute -right-20 top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 bottom-10 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />

            <div className="relative flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 shadow-lg shadow-blue-950/20">
                <Building2 size={25} />
              </div>

              <span className="text-2xl font-extrabold tracking-tight">
                Studio<span className="text-blue-400">Hub</span>
              </span>
            </div>

            <div className="relative my-auto py-12">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-200">
                <Sparkles size={14} />
                Your creative journey starts here
              </span>

              <h1 className="max-w-sm text-4xl font-extrabold leading-tight tracking-tight xl:text-5xl">
                Bring your studio into the spotlight.
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-7 text-blue-100/80">
                Create your studio profile, showcase your services, and help
                customers discover your creative business.
              </p>

              <div className="mt-10 space-y-6">
                {[
                  {
                    icon: Users,
                    title: "Reach more clients",
                    text: "Get discovered by people looking for creative services.",
                  },
                  {
                    icon: BriefcaseBusiness,
                    title: "Showcase your work",
                    text: "Present your studio and services professionally.",
                  },
                  {
                    icon: ChartNoAxesCombined,
                    title: "Grow your brand",
                    text: "Build your reputation and expand your opportunities.",
                  },
                ].map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
                      <Icon size={21} />
                    </div>

                    <div>
                      <h3 className="font-semibold">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-blue-100/70">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="relative text-xs text-blue-200/60">
              © {new Date().getFullYear()} StudioHub · Connect · Create · Grow
            </p>
          </aside>

          {/* Registration form */}
          <main className="min-w-0 px-4 py-7 sm:px-8 sm:py-10 lg:px-10 xl:px-16">
            <div className="mx-auto max-w-3xl">

              {/* Header */}
              <div className="mb-8 flex items-center justify-between gap-3">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
                >
                  <ArrowLeft size={16} />
                  Back to Home
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

              <div className="mb-8">
                <div className="mb-3 flex items-center gap-2 text-blue-600 lg:hidden">
                  <Building2 size={25} />
                  <span className="text-xl font-extrabold">
                    Studio<span className="text-slate-900">Hub</span>
                  </span>
                </div>

                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                  Join StudioHub
                </p>

                <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Create your studio account
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                  Tell us about your studio, select the services you offer,
                  and prepare your account.
                </p>
              </div>

              {/* Progress steps */}
              <div className="mb-8 rounded-2xl border border-slate-200 bg-white px-3 py-5 shadow-sm sm:px-6">
                <div className="grid grid-cols-3">
                  {steps.map(({ title, icon: Icon }, index) => {
                    const active = currentStep === index;
                    const complete = stepComplete(index);

                    return (
                      <button
                        key={title}
                        type="button"
                        onClick={() => goToStep(index)}
                        className="group flex min-w-0 flex-col items-center text-center"
                        aria-current={active ? "step" : undefined}
                      >
                        <span
                          className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition ${
                            complete
                              ? "border-blue-600 bg-blue-600 text-white"
                              : active
                                ? "border-blue-600 bg-blue-50 text-blue-600"
                                : "border-slate-200 bg-white text-slate-400 group-hover:border-blue-300"
                          }`}
                        >
                          {complete ? (
                            <Check size={19} strokeWidth={2.5} />
                          ) : (
                            <Icon size={19} />
                          )}
                        </span>

                        <span
                          className={`mt-2 text-[10px] font-semibold sm:text-sm ${
                            active || complete
                              ? "text-blue-700"
                              : "text-slate-400"
                          }`}
                        >
                          {title}
                        </span>

                        <span
                          className={`mt-1 hidden text-[10px] sm:block ${
                            complete ? "text-emerald-600" : "text-slate-400"
                          }`}
                        >
                          {complete
                            ? "Completed"
                            : active
                              ? "In progress"
                              : `Step ${index + 1}`}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div
                  className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-100"
                  role="progressbar"
                  aria-valuemin={1}
                  aria-valuemax={3}
                  aria-valuenow={currentStep + 1}
                  aria-label="Registration progress"
                >
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-300"
                    style={{
                      width: `${((currentStep + 1) / 3) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                {/* Form heading */}
                <div className="border-b border-slate-100 px-5 py-5 sm:px-8">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      {currentStep === 0 && <Building2 size={22} />}
                      {currentStep === 1 && <UserRound size={22} />}
                      {currentStep === 2 && <LockKeyhole size={22} />}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="font-bold sm:text-lg">
                        {steps[currentStep].title}
                      </h2>

                      <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                        {currentStep === 0 &&
                          "Introduce your studio and select all applicable services."}
                        {currentStep === 1 &&
                          "Add your location and business contact information."}
                        {currentStep === 2 &&
                          "Create a secure password for your account."}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700 sm:text-xs">
                      Step {currentStep + 1} of 3
                    </span>
                  </div>
                </div>

                <div className="space-y-6 px-5 py-6 sm:px-8 sm:py-8">

                  {/* STEP 1: Studio details */}
                  {currentStep === 0 && (
                    <>
                      <Field
                        label="Studio Name"
                        error={errors.studioName}
                      >
                        <div className="relative">
                          <Building2
                            size={18}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            type="text"
                            autoComplete="organization"
                            value={values.studioName}
                            disabled={!isUnlocked("studioName")}
                            placeholder="e.g. Bonheur Creative Studio"
                            onChange={(event) =>
                              updateField("studioName", event.target.value)
                            }
                            aria-invalid={Boolean(errors.studioName)}
                            className={inputClass(
                              !isUnlocked("studioName")
                            )}
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
                            disabled={!isUnlocked("studioType")}
                            onChange={(event) =>
                              updateField("studioType", event.target.value)
                            }
                            aria-invalid={Boolean(errors.studioType)}
                            className={`${inputClass(
                              !isUnlocked("studioType")
                            )} appearance-none pr-10`}
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
                        hint="Select every service your studio provides. For example, Photography and Videography can be selected together."
                      >
                        <div
                          className={`grid grid-cols-1 gap-2 rounded-xl border p-3 sm:grid-cols-2 ${
                            errors.category
                              ? "border-red-300 bg-red-50/30"
                              : "border-slate-200 bg-white"
                          }`}
                        >
                          {categories.map((category) => {
                            const selected =
                              values.category.includes(category);

                            return (
                              <label
                                key={category}
                                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition ${
                                  selected
                                    ? "border-blue-300 bg-blue-50 text-blue-800"
                                    : "border-transparent bg-slate-50 text-slate-600 hover:border-slate-200 hover:bg-white"
                                } ${
                                  !isUnlocked("category")
                                    ? "cursor-not-allowed opacity-60"
                                    : ""
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={selected}
                                  disabled={!isUnlocked("category")}
                                  onChange={(event) => {
                                    const nextCategories =
                                      event.target.checked
                                        ? [...values.category, category]
                                        : values.category.filter(
                                            (item) => item !== category
                                          );

                                    updateField("category", nextCategories);
                                  }}
                                  className="h-4 w-4 shrink-0 rounded border-slate-300 accent-blue-600"
                                />

                                <span className="flex-1 font-medium">
                                  {category}
                                </span>

                                {selected && (
                                  <CheckCircle2
                                    size={17}
                                    className="shrink-0 text-blue-600"
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

                      <LogoUpload
                        logo={logo}
                        setLogo={setLogo}
                        error={logoError}
                        setError={setLogoError}
                      />

                      <div className="flex items-start gap-3 rounded-xl bg-blue-50 p-4">
                        <Tag
                          size={19}
                          className="mt-0.5 shrink-0 text-blue-600"
                        />

                        <p className="text-xs leading-5 text-blue-800">
                          Select all the services your studio offers. This
                          helps customers find your studio when searching for
                          specific creative services.
                        </p>
                      </div>
                    </>
                  )}

                  {/* STEP 2: Contact information */}
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
                            disabled={!isUnlocked("location")}
                            placeholder="e.g. Kigali, Gasabo"
                            onChange={(event) =>
                              updateField("location", event.target.value)
                            }
                            aria-invalid={Boolean(errors.location)}
                            className={inputClass(
                              !isUnlocked("location")
                            )}
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
                            disabled={!isUnlocked("phone")}
                            placeholder="e.g. +250 788 000 000"
                            onChange={(event) =>
                              updateField("phone", event.target.value)
                            }
                            aria-invalid={Boolean(errors.phone)}
                            className={inputClass(!isUnlocked("phone"))}
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
                            disabled={!isUnlocked("email")}
                            placeholder="studio@example.com"
                            onChange={(event) =>
                              updateField("email", event.target.value)
                            }
                            aria-invalid={Boolean(errors.email)}
                            className={inputClass(!isUnlocked("email"))}
                          />
                        </div>
                      </Field>

                      <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                        <ShieldCheck
                          size={21}
                          className="mb-2 text-blue-600"
                        />

                        <p className="text-sm font-semibold text-slate-800">
                          Your business information
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Ensure your contact details are correct so customers
                          can reach your studio.
                        </p>
                      </div>
                    </>
                  )}

                  {/* STEP 3: Account security */}
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
                            disabled={!isUnlocked("password")}
                            placeholder="Create a strong password"
                            onChange={(event) =>
                              updateField("password", event.target.value)
                            }
                            aria-invalid={Boolean(errors.password)}
                            className={`${inputClass(
                              !isUnlocked("password")
                            )} pr-12`}
                          />

                          <button
                            type="button"
                            disabled={!isUnlocked("password")}
                            onClick={() =>
                              setShowPassword((previous) => !previous)
                            }
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-600 disabled:cursor-not-allowed"
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
                        label="Confirm Password"
                        error={errors.confirmPassword}
                      >
                        <div className="relative">
                          <LockKeyhole
                            size={18}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            type={
                              showConfirmPassword ? "text" : "password"
                            }
                            autoComplete="new-password"
                            value={values.confirmPassword}
                            disabled={!isUnlocked("confirmPassword")}
                            placeholder="Enter your password again"
                            onChange={(event) =>
                              updateField(
                                "confirmPassword",
                                event.target.value
                              )
                            }
                            aria-invalid={Boolean(errors.confirmPassword)}
                            className={`${inputClass(
                              !isUnlocked("confirmPassword")
                            )} pr-12`}
                          />

                          <button
                            type="button"
                            disabled={!isUnlocked("confirmPassword")}
                            onClick={() =>
                              setShowConfirmPassword((previous) => !previous)
                            }
                            aria-label={
                              showConfirmPassword
                                ? "Hide password"
                                : "Show password"
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-600 disabled:cursor-not-allowed"
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
                        <div className="flex items-start gap-3">
                          <ShieldCheck
                            size={23}
                            className="shrink-0 text-emerald-600"
                          />

                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              Keep your account secure
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              Use a unique password. Avoid using passwords
                              from your other accounts.
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                          <p
                            className={`flex items-center gap-2 text-xs ${
                              values.password.length >= 8
                                ? "text-emerald-600"
                                : "text-slate-400"
                            }`}
                          >
                            <CheckCircle2 size={15} />
                            At least 8 characters
                          </p>

                          <p
                            className={`flex items-center gap-2 text-xs ${
                              /[A-Za-z]/.test(values.password)
                                ? "text-emerald-600"
                                : "text-slate-400"
                            }`}
                          >
                            <CheckCircle2 size={15} />
                            Contains a letter
                          </p>

                          <p
                            className={`flex items-center gap-2 text-xs ${
                              /\d/.test(values.password)
                                ? "text-emerald-600"
                                : "text-slate-400"
                            }`}
                          >
                            <CheckCircle2 size={15} />
                            Contains a number
                          </p>
                        </div>
                      </div>

                      {/* Review registration details */}
                      <div className="rounded-xl bg-slate-50 p-4">
                        <h3 className="text-sm font-bold text-slate-800">
                          Review your studio
                        </h3>

                        <div className="mt-3 space-y-3 text-sm">
                          <div className="flex items-start justify-between gap-4">
                            <span className="text-slate-500">Studio</span>
                            <span className="text-right font-semibold text-slate-800">
                              {values.studioName}
                            </span>
                          </div>

                          <div className="flex items-start justify-between gap-4">
                            <span className="text-slate-500">Type</span>
                            <span className="text-right font-semibold text-slate-800">
                              {values.studioType}
                            </span>
                          </div>

                          <div className="flex items-start justify-between gap-4">
                            <span className="text-slate-500">Location</span>
                            <span className="text-right font-semibold text-slate-800">
                              {values.location}
                            </span>
                          </div>

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
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Form navigation */}
                <div className="flex items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-5 sm:px-8">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={currentStep === 0}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:invisible"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>

                  {currentStep < 2 ? (
                    <button
                      type="button"
                      onClick={goNext}
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                    >
                      Next Step
                      <ArrowRight size={17} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                    >
                      Complete Registration
                      <CheckCircle2 size={17} />
                    </button>
                  )}
                </div>
              </form>

              <div className="mt-6 flex items-start justify-center gap-2 text-center">
                <ShieldCheck
                  size={15}
                  className="mt-0.5 shrink-0 text-slate-400"
                />

                <p className="max-w-xl text-xs leading-5 text-slate-400">
                  By registering, you agree to StudioHub's Terms of Service
                  and Privacy Policy.
                </p>
              </div>

              <p className="mt-4 text-center text-xs text-slate-400">
                StudioHub · Connect · Create · Grow
              </p>
            </div>
          </main>
        </div>
      </div>

      {/* Registration success modal */}
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
