
import { useState } from "react";
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
  FileText,
  Image,
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
} from "lucide-react";

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

const studioTypes = [
  "Individual / Freelancer",
  "Small Studio",
  "Medium Business",
  "Large Agency",
];

const initialValues = {
  studioName: "",
  category: "",
  studioType: "",
  description: "",
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

export default function Register() {
  const [values, setValues] = useState(initialValues);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [logo, setLogo] = useState(null);
  const [cover, setCover] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = (name, value) => {
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
    setSubmitted(false);
  };

  const valid = {
    studioName: values.studioName.trim().length >= 2,
    category: Boolean(values.category),
    studioType: Boolean(values.studioType),
    description: values.description.trim().length >= 20,
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
    "description",
    "location",
    "phone",
    "email",
    "password",
    "confirmPassword",
  ];

  // Each field becomes available after the preceding field is valid.
  const isUnlocked = (field) => {
    const index = fieldOrder.indexOf(field);
    if (index <= 0) return true;

    return fieldOrder
      .slice(0, index)
      .every((previousField) => valid[previousField]);
  };

  const firstInvalid = (fields) =>
    fields.find((field) => !valid[field]);

  const stepFields = [
    ["studioName", "category", "studioType", "description"],
    ["location", "phone", "email"],
    ["password", "confirmPassword"],
  ];

  const stepComplete = (step) =>
    stepFields[step].every((field) => valid[field]);

  const goNext = () => {
    const invalidField = firstInvalid(stepFields[currentStep]);

    if (invalidField) {
      setErrors((previous) => ({
        ...previous,
        [invalidField]: "Please complete this field correctly.",
      }));
      return;
    }

    setErrors({});
    setCurrentStep((previous) => Math.min(previous + 1, 2));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setCurrentStep((previous) => Math.max(previous - 1, 0));
    setErrors({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const invalidField = firstInvalid(fieldOrder);

    if (invalidField) {
      setErrors({
        [invalidField]: "Please complete this field correctly.",
      });
      return;
    }

    // Frontend demonstration only: connect your backend/API here.
    setSubmitted(true);
  };

  const fieldClass = (disabled = false) =>
    `w-full rounded-xl border px-4 py-3 text-sm outline-none transition
    ${
      disabled
        ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
        : "border-slate-200 bg-white text-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
    }`;

  const Label = ({ children, required = true }) => (
    <label className="mb-2 block text-sm font-semibold text-slate-700">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );

  const Field = ({
    name,
    label,
    icon: Icon,
    placeholder,
    type = "text",
    hint,
    disabled,
    children,
  }) => (
    <div className="min-w-0">
      <Label>{label}</Label>

      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${
              disabled ? "text-slate-300" : "text-slate-400"
            }`}
          />
        )}

        {children || (
          <input
            type={type}
            value={values[name]}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(event) =>
              updateField(name, event.target.value)
            }
            className={`${fieldClass(disabled)} ${Icon ? "pl-11" : ""}`}
            aria-invalid={Boolean(errors[name])}
          />
        )}
      </div>

      {errors[name] && (
        <p className="mt-1.5 text-xs text-red-500">{errors[name]}</p>
      )}

      {!errors[name] && hint && (
        <p className="mt-1.5 text-xs text-slate-400">{hint}</p>
      )}
    </div>
  );

  const UploadBox = ({ title, file, setFile, accept, icon: Icon }) => (
    <div>
      <Label required={title === "Studio Logo"}>{title}</Label>

      <label
        className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/70 p-4 text-center transition hover:border-blue-400 hover:bg-blue-50/50"
      >
        {file ? (
          <>
            <CheckCircle2 className="mb-2 text-emerald-500" size={26} />
            <span className="max-w-full truncate text-sm font-medium text-slate-700">
              {file.name}
            </span>
            <span className="mt-1 text-xs text-slate-400">
              Click to change
            </span>
          </>
        ) : (
          <>
            <Icon size={27} className="mb-2 text-blue-500" />
            <span className="text-sm font-medium text-slate-600">
              Click to upload
            </span>
            <span className="mt-1 text-xs text-slate-400">
              PNG, JPG or WEBP · Max 5 MB
            </span>
          </>
        )}

        <input
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(event) => {
            const selected = event.target.files?.[0];

            if (!selected) return;

            if (selected.size > 5 * 1024 * 1024) {
              setErrors((previous) => ({
                ...previous,
                [title]: "The image must be smaller than 5 MB.",
              }));
              event.target.value = "";
              return;
            }

            setErrors((previous) => ({ ...previous, [title]: "" }));
            setFile(selected);
          }}
        />
      </label>

      {errors[title] && (
        <p className="mt-1.5 text-xs text-red-500">{errors[title]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[340px_minmax(0,1fr)] xl:grid-cols-[390px_minmax(0,1fr)]">
        {/* Branding panel */}
        <aside className="relative hidden overflow-hidden bg-[#071d49] p-9 text-white lg:flex lg:flex-col">
          <div className="absolute -right-24 top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -left-24 bottom-10 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />

          <a href="/" className="relative flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500">
              <Building2 size={25} />
            </div>
            <span className="text-2xl font-extrabold tracking-tight">
              Studio<span className="text-blue-400">Hub</span>
            </span>
          </a>

          <div className="relative my-auto py-12">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-200">
              <Sparkles size={14} />
              Your creative journey starts here
            </span>

            <h1 className="max-w-sm text-4xl font-extrabold leading-tight tracking-tight">
              Bring your studio into the spotlight.
            </h1>

            <p className="mt-5 max-w-sm leading-7 text-blue-100/80">
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
            © {new Date().getFullYear()} StudioHub. Connect · Create · Grow.
          </p>
        </aside>

        {/* Registration area */}
        <main className="min-w-0 px-4 py-6 sm:px-8 sm:py-9 lg:px-10 xl:px-16">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex items-center justify-between gap-3">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-blue-600"
              >
                <ArrowLeft size={16} />
                <span>Back to Home</span>
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
              <div className="mb-2 flex items-center gap-2 text-blue-600 lg:hidden">
                <Building2 size={22} />
                <span className="text-lg font-extrabold">
                  Studio<span className="text-slate-900">Hub</span>
                </span>
              </div>

              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Create your studio account
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                Tell us about your studio and get ready to showcase your work.
              </p>
            </div>

            {/* Stepper */}
            <div className="mb-8 grid grid-cols-3">
              {steps.map(({ title, icon: Icon }, index) => {
                const active = currentStep === index;
                const complete = stepComplete(index);

                return (
                  <button
                    key={title}
                    type="button"
                    disabled={
                      index > currentStep &&
                      !steps
                        .slice(0, index)
                        .every((_, previous) => stepComplete(previous))
                    }
                    onClick={() => {
                      if (
                        index <= currentStep ||
                        steps
                          .slice(0, index)
                          .every((_, previous) => stepComplete(previous))
                      ) {
                        setCurrentStep(index);
                        setErrors({});
                      }
                    }}
                    className="group flex flex-col items-center text-center disabled:cursor-not-allowed"
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

            {/* Form card */}
            <form
              onSubmit={handleSubmit}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="border-b border-slate-100 px-5 py-5 sm:px-8">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    {currentStep === 0 && <Building2 size={22} />}
                    {currentStep === 1 && <UserRound size={22} />}
                    {currentStep === 2 && <LockKeyhole size={22} />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold sm:text-lg">
                      {steps[currentStep].title}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                      {currentStep === 0 &&
                        "Introduce your studio and the services you provide."}
                      {currentStep === 1 &&
                        "Add your location and the contact details clients can use."}
                      {currentStep === 2 &&
                        "Set up secure credentials for your studio account."}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-600 sm:text-xs">
                    Step {currentStep + 1} of 3
                  </span>
                </div>
              </div>

              <div className="space-y-6 px-5 py-6 sm:px-8 sm:py-8">
                {currentStep === 0 && (
                  <>
                    <Field
                      name="studioName"
                      label="Studio Name"
                      icon={Building2}
                      placeholder="e.g. Bonheur Studio"
                      disabled={!isUnlocked("studioName")}
                    />

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        name="category"
                        label="Studio Category"
                        icon={Tag}
                        disabled={!isUnlocked("category")}
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
                            className={`${fieldClass(
                              !isUnlocked("category")
                            )} appearance-none pl-11 pr-10`}
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
                        name="studioType"
                        label="Studio Type"
                        disabled={!isUnlocked("studioType")}
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
                            className={`${fieldClass(
                              !isUnlocked("studioType")
                            )} appearance-none pl-11 pr-10`}
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

                    <Field
                      name="description"
                      label="Studio Description"
                      icon={FileText}
                      disabled={!isUnlocked("description")}
                      hint={`${values.description.length}/500 characters · Minimum 20 characters`}
                    >
                      <textarea
                        rows={4}
                        maxLength={500}
                        value={values.description}
                        disabled={!isUnlocked("description")}
                        placeholder="Describe your studio, what you do, and what makes you unique..."
                        onChange={(event) =>
                          updateField("description", event.target.value)
                        }
                        className={`${fieldClass(
                          !isUnlocked("description")
                        )} resize-y`}
                      />
                    </Field>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <UploadBox
                        title="Studio Logo"
                        file={logo}
                        setFile={setLogo}
                        accept="image/png,image/jpeg,image/webp,image/svg+xml"
                        icon={Image}
                      />
                      <UploadBox
                        title="Cover Image"
                        file={cover}
                        setFile={setCover}
                        accept="image/png,image/jpeg,image/webp"
                        icon={Camera}
                      />
                    </div>
                    <p className="text-xs leading-5 text-slate-400">
                      Images are optional for now. You can add them to make
                      your profile more attractive.
                    </p>
                  </>
                )}

                {currentStep === 1 && (
                  <>
                    <Field
                      name="location"
                      label="Studio Location"
                      icon={MapPin}
                      placeholder="e.g. Kigali, Gasabo"
                      disabled={!isUnlocked("location")}
                      hint="Enter your city, district, or neighborhood."
                    />

                    <Field
                      name="phone"
                      label="Phone Number"
                      icon={Phone}
                      type="tel"
                      placeholder="e.g. +250 788 000 000"
                      disabled={!isUnlocked("phone")}
                      hint="Include your country code if applicable."
                    />

                    <Field
                      name="email"
                      label="Business Email"
                      icon={Mail}
                      type="email"
                      placeholder="studio@example.com"
                      disabled={!isUnlocked("email")}
                      hint="Use an email address you can access."
                    />

                    <div className="rounded-xl bg-blue-50 p-4 text-sm leading-6 text-blue-800">
                      <ShieldCheck
                        size={20}
                        className="mb-2 text-blue-600"
                      />
                      Make sure your contact information is correct so
                      potential clients can reach your studio.
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <Field
                      name="password"
                      label="Password"
                      icon={LockKeyhole}
                      disabled={!isUnlocked("password")}
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
                          className={`${fieldClass(
                            !isUnlocked("password")
                          )} pl-11 pr-12`}
                        />
                        <button
                          type="button"
                          disabled={!isUnlocked("password")}
                          onClick={() =>
                            setShowPassword((previous) => !previous)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 disabled:opacity-30"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
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
                      name="confirmPassword"
                      label="Confirm Password"
                      icon={LockKeyhole}
                      disabled={!isUnlocked("confirmPassword")}
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
                            updateField("confirmPassword", event.target.value)
                          }
                          className={`${fieldClass(
                            !isUnlocked("confirmPassword")
                          )} pl-11 pr-12`}
                        />
                        <button
                          type="button"
                          disabled={!isUnlocked("confirmPassword")}
                          onClick={() =>
                            setShowConfirmPassword((previous) => !previous)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 disabled:opacity-30"
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1.5 text-xs text-red-500">
                          {errors.confirmPassword}
                        </p>
                      )}
                      {values.confirmPassword &&
                        values.password !== values.confirmPassword && (
                          <p className="mt-1.5 text-xs text-red-500">
                            Passwords do not match.
                          </p>
                        )}
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
                          Use a unique password. Your account should be
                          created securely through the StudioHub backend.
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {submitted && (
                  <div
                    role="status"
                    className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"
                  >
                    Your form is valid! The frontend is ready for backend
                    integration, but no account has been created yet.
                  </div>
                )}
              </div>

              {/* Navigation */}
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
                    Create Studio Account
                    <CheckCircle2 size={17} />
                  </button>
                )}
              </div>
            </form>

            <p className="mt-6 text-center text-xs leading-5 text-slate-400">
              By registering, you agree to StudioHub's Terms of Service and
              Privacy Policy.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
