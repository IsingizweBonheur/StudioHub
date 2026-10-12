
import { useState } from "react";
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
  Image as ImageIcon,
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
  X,
  Upload,
  Home,
} from "lucide-react";

// Studio categories
const categories = [
  "Photography",
  "Videography",
  "Graphic Design",
  "Music & Audio",
  "Web Development",
  "Digital Marketing",
  "Content Creation",
  "Fashion & Styling",
  "Event Planning",
  "Other",
];

// Studio sizes
const studioTypes = [
  "Individual / Freelancer",
  "Small Studio",
  "Medium Business",
  "Large Agency",
];

// Initial form data
const initialValues = {
  studioName: "",
  category: "",
  studioType: "",
  location: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// Registration steps
const steps = [
  { title: "Studio Details", icon: Building2 },
  { title: "Contact Info", icon: UserRound },
  { title: "Account Security", icon: ShieldCheck },
];

// Reusable label outside Register to preserve input focus
function Label({ children, required = true }) {
  return (
    <label className="mb-2 block text-sm font-semibold text-slate-700">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

// Reusable input outside Register
function Field({
  label,
  icon: Icon,
  disabled = false,
  error,
  hint,
  children,
}) {
  return (
    <div className="min-w-0">
      <Label>{label}</Label>

      {children ? (
        children
      ) : (
        <div className="relative">
          {Icon && (
            <Icon
              size={18}
              className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${
                disabled ? "text-slate-300" : "text-slate-400"
              }`}
            />
          )}
        </div>
      )}

      {error && (
        <p className="mt-1.5 text-xs text-red-500">{error}</p>
      )}

      {!error && hint && (
        <p className="mt-1.5 text-xs text-slate-400">{hint}</p>
      )}
    </div>
  );
}

// Reusable image upload
function LogoUpload({ logo, setLogo, error, setError }) {
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
  };

  return (
    <div className="max-w-md">
      <Label required={false}>Studio Logo</Label>

      <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-5 text-center transition hover:border-blue-400 hover:bg-blue-50/50">
        {logo ? (
          <>
            <img
              src={URL.createObjectURL(logo)}
              alt="Selected studio logo"
              className="mb-3 h-16 w-16 rounded-xl border border-slate-200 bg-white object-contain"
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
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Upload size={23} />
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
        <p className="mt-1.5 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}

// Success modal
function SuccessModal({ onClose, studioName }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      role="presentation"
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
          className="mt-4 text-2xl font-extrabold text-slate-900"
        >
          Congratulations!
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Your StudioHub registration form for{" "}
          <span className="font-semibold text-slate-800">
            {studioName}
          </span>{" "}
          has been completed successfully.
        </p>

        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-left">
          <p className="text-sm font-semibold text-amber-900">
            One more thing
          </p>
          <p className="mt-1 text-xs leading-5 text-amber-800">
            This is a frontend demonstration. Your account has not been
            saved to a database because the registration backend is not
            connected yet.
          </p>
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

  // Field validation
  const valid = {
    studioName: values.studioName.trim().length >= 2,
    category: Boolean(values.category),
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

  // Unlock the next field once all previous fields are valid
  const isUnlocked = (field) => {
    const index = fieldOrder.indexOf(field);

    if (index <= 0) return true;

    return fieldOrder
      .slice(0, index)
      .every((previousField) => valid[previousField]);
  };

  const stepComplete = (step) =>
    stepFields[step].every((field) => valid[field]);

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

  const fieldClass = (disabled = false) =>
    `w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
      disabled
        ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
        : "border-slate-200 bg-white text-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
    }`;

  const inputClass = (disabled = false, hasIcon = true) =>
    `${fieldClass(disabled)} ${hasIcon ? "pl-11" : ""}`;

  const validateStep = (step) => {
    const invalidField = stepFields[step].find(
      (field) => !valid[field]
    );

    if (invalidField) {
      setErrors((previous) => ({
        ...previous,
        [invalidField]: getError(invalidField),
      }));

      return false;
    }

    return true;
  };

  const getError = (field) => {
    const messages = {
      studioName: "Enter a studio name with at least 2 characters.",
      category: "Please select a studio category.",
      studioType: "Please select your studio type.",
      location: "Enter your studio location.",
      phone: "Enter a valid phone number.",
      email: "Enter a valid email address.",
      password: "Use at least 8 characters, including a letter and a number.",
      confirmPassword: "Your passwords must match.",
    };

    return messages[field] || "Please complete this field.";
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

    const invalidField = fieldOrder.find(
      (field) => !valid[field]
    );

    if (invalidField) {
      setErrors((previous) => ({
        ...previous,
        [invalidField]: getError(invalidField),
      }));
      return;
    }

    setShowSuccess(true);
  };

  return (
    <>
      <Navbar />

      <Breadcrumb
        title="Studio Registration"
        paths={[
          { label: "Home", link: "/" },
          { label: "Studio Registration", link: "/register" },
        ]}
      />

      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[380px_minmax(0,1fr)]">

          {/* Desktop branding panel */}
          <aside className="relative hidden overflow-hidden bg-[#071d49] p-8 text-white lg:flex lg:flex-col xl:p-10">
            <div className="absolute -right-20 top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute -left-20 bottom-10 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />

            <div className="relative flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500">
                <Building2 size={25} />
              </div>

              <span className="text-2xl font-extrabold">
                Studio<span className="text-blue-400">Hub</span>
              </span>
            </div>

            <div className="relative my-auto py-12">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-200">
                <Sparkles size={14} />
                Your creative journey starts here
              </span>

              <h1 className="max-w-sm text-4xl font-extrabold leading-tight tracking-tight">
                Bring your studio into the spotlight.
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-7 text-blue-100/80">
                Create your studio profile, showcase your services, and
                help customers discover your creative business.
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
                  className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-blue-600"
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
                  <Building2 size={24} />
                  <span className="text-xl font-extrabold">
                    Studio<span className="text-slate-900">Hub</span>
                  </span>
                </div>

                <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Create your studio account
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                  Tell us about your studio and get ready to showcase your work.
                </p>
              </div>

              {/* Progress steps */}
              <div className="mb-8 grid grid-cols-3">
                {steps.map(({ title, icon: Icon }, index) => {
                  const active = currentStep === index;
                  const complete = stepComplete(index);

                  const canVisit =
                    index <= currentStep ||
                    steps
                      .slice(0, index)
                      .every((_, previous) => stepComplete(previous));

                  return (
                    <button
                      key={title}
                      type="button"
                      disabled={!canVisit}
                      onClick={() => {
                        if (!canVisit) return;

                        setCurrentStep(index);
                        setErrors({});
                      }}
                      className="flex flex-col items-center text-center disabled:cursor-not-allowed"
                    >
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                          complete
                            ? "border-blue-600 bg-blue-600 text-white"
                            : active
                              ? "border-blue-600 bg-blue-50 text-blue-600"
                              : "border-slate-200 bg-white text-slate-400"
                        }`}
                      >
                        {complete ? <Check size={18} /> : <Icon size={18} />}
                      </span>

                      <span
                        className={`mt-2 text-[11px] font-semibold sm:text-sm ${
                          active || complete
                            ? "text-blue-600"
                            : "text-slate-400"
                        }`}
                      >
                        {title}
                      </span>
                    </button>
                  );
                })}
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                {/* Form title */}
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
                          "Introduce your studio and select its category."}
                        {currentStep === 1 &&
                          "Add your location and contact information."}
                        {currentStep === 2 &&
                          "Create a secure password for your account."}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-600 sm:text-xs">
                      Step {currentStep + 1} of 3
                    </span>
                  </div>
                </div>

                <div className="space-y-6 px-5 py-6 sm:px-8 sm:py-8">

                  {/* STEP 1 */}
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
                            className={inputClass(
                              !isUnlocked("studioName")
                            )}
                          />
                        </div>
                      </Field>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                          label="Studio Category"
                          error={errors.category}
                        >
                          <div className="relative">
                            <Tag
                              size={18}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <select
                              value={values.category}
                              disabled={!isUnlocked("category")}
                              onChange={(event) =>
                                updateField("category", event.target.value)
                              }
                              className={`${inputClass(
                                !isUnlocked("category")
                              )} appearance-none pr-10`}
                            >
                              <option value="">Select category</option>

                              {categories.map((category) => (
                                <option key={category} value={category}>
                                  {category}
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
                          label="Studio Type"
                          error={errors.studioType}
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
                      </div>

                      <LogoUpload
                        logo={logo}
                        setLogo={setLogo}
                        error={logoError}
                        setError={setLogoError}
                      />
                    </>
                  )}

                  {/* STEP 2 */}
                  {currentStep === 1 && (
                    <>
                      <Field
                        label="Studio Location"
                        icon={MapPin}
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
                            className={inputClass(!isUnlocked("email"))}
                          />
                        </div>
                      </Field>

                      <div className="rounded-xl bg-blue-50 p-4 text-sm leading-6 text-blue-800">
                        <ShieldCheck size={20} className="mb-2 text-blue-600" />
                        Ensure your contact information is correct so clients
                        can reach your studio.
                      </div>
                    </>
                  )}

                  {/* STEP 3 */}
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
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
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
                            type={showConfirmPassword ? "text" : "password"}
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

                      <div className="flex items-start gap-3 rounded-xl border border-slate-200 p-4">
                        <ShieldCheck
                          size={22}
                          className="shrink-0 text-emerald-600"
                        />

                        <div>
                          <p className="text-sm font-semibold">
                            Keep your account secure
                          </p>
                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            Use a unique password to protect your studio account.
                          </p>
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
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 disabled:invisible"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>

                  {currentStep < 2 ? (
                    <button
                      type="button"
                      onClick={goNext}
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20"
                    >
                      Next Step
                      <ArrowRight size={17} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20"
                    >
                      Complete Registration
                      <CheckCircle2 size={17} />
                    </button>
                  )}
                </div>
              </form>

              <p className="mt-6 text-center text-xs leading-5 text-slate-400">
                By registering, you agree to StudioHub's Terms of Service
                and Privacy Policy.
              </p>
            </div>
          </main>
        </div>
      </div>

      {/* Registration success modal */}
      {showSuccess && (
        <SuccessModal
          studioName={values.studioName.trim()}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </>
  );
}
