import React from "react";
import Select from "react-dropdown-select";

const TranslationService = {
  translate: (key = null, obj = null) => {},
};
const ENABLE_TRANSLATION = false;

const cn = (...classes) => classes.filter(Boolean).join(" ");

export const TextInputControl = ({
  id = "",
  translate_key = "",
  name = "",
  label = "",
  value,
  onChange,
  onBlur,
  placeholder = "",
  type = "text",
  error = false,
  errorMessage = "This field is required.",
  className = "",
  inputClassName = "",
  touched,
  errors,
  readOnly = false,
  disabled = false,
  leftIcon = null,
  rightIcon = null,
}) => {
  const displayLabel = ENABLE_TRANSLATION
    ? TranslationService.translate(translate_key, { defaultValue: label })
    : label;

  return (
    <div className={cn("mb-4 text-start", className)}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 "
        >
          {displayLabel}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        <input
          id={id}
          name={name}
          type={type}
          min={0}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          className={cn(
            "w-full px-3 py-2 border rounded-lg focus:outline-none transition-colors",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            disabled && "bg-gray-100 cursor-not-allowed",
            touched?.[id] && errors?.[id]
              ? "border-red-500 focus:ring-2 focus:ring-red-500"
              : "border-gray-300 focus:ring-2 focus:ring-teal-500",
            inputClassName
          )}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>

      {touched?.[id] ||
        (errors?.[id] && (
          <p className="text-sm text-red-500 mt-1">{errors[id]}</p>
        ))}
    </div>
  );
};

export const ValueSelecterControl = ({
  id = "",
  translate_key = "",
  label = "",
  options = [],
  value = "",
  onChange,
  onBlur,
  error = false,
  className = "",
  inputClassName = "",
  touched,
  errors,
  disabled = false,
}) => {
  const displayLabel = ENABLE_TRANSLATION
    ? TranslationService.translate(translate_key, { defaultValue: label })
    : label;

  return (
    <div className={cn("mb-4 text-start", className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {displayLabel}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={cn(
          "w-full px-3 py-2 border rounded-lg focus:outline-none transition-colors",
          "border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100",
          error
            ? "border-red-500 focus:ring-2 focus:ring-red-500"
            : "border-gray-300 focus:ring-2 focus:ring-teal-500",
          inputClassName
        )}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {touched?.[id] && errors?.[id] && (
        <p className="text-sm text-red-500 mt-1">{errors[id]}</p>
      )}
    </div>
  );
};

export const SelecterControl = ({
  id = "",
  label = "",
  options = [],
  value = [],
  onChange,
  onBlur,
  error = false,
  className = "",
  inputClassName = "",
  touched,
  errors,
  multi = false,
  disabled = false,
  loading = false,
  searchable = true,
  clearable = true,
  creatable = false,
  stayOpen = false,
  dropdownHandle = true,
  customRender = false,
  customDropdownRender = false,
  customItemRender = false,
  keepSelected = false,
  closeOnSelect = true,
  dropdownColor = "#f8f9fa",
  dropdownHeight = "300px",
  dropdownDirection = "ltr",
  placeholder = "+ add",
  searchBy = "label",
}) => {
  const displayLabel = label;

  return (
    <div className={cn("mb-4 text-start", className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {displayLabel}
        </label>
      )}
      <Select
        id={id}
        options={options}
        values={value ? options.filter((opt) => value.includes(opt.value)) : []}
        onChange={(selected) =>
          onChange({
            target: { name: id, value: selected.map((opt) => opt.value) },
          })
        }
        onBlur={onBlur}
        multi={multi}
        disabled={disabled}
        loading={loading}
        searchable={searchable}
        clearable={clearable}
        create={creatable}
        keepOpen={stayOpen}
        dropdownHandle={dropdownHandle}
        dropdownHeight={dropdownHeight}
        dropdownDirection={dropdownDirection}
        placeholder={placeholder}
        searchBy={searchBy}
        className={cn(
          "w-full border px-3 py-2 rounded-lg",
          error ? "border-red-500" : "border-gray-300",
          inputClassName
        )}
        style={{ backgroundColor: dropdownColor }}
        itemRenderer={
          customItemRender
            ? ({ item, methods, state }) => (
                <div
                  key={item.value}
                  className={cn(
                    "cursor-pointer px-2 py-1",
                    state.values.includes(item) && "bg-teal-100"
                  )}
                  onClick={() => methods.addItem(item)}
                >
                  {item.custom || item.label}
                </div>
              )
            : undefined
        }
        contentRenderer={
          customRender
            ? ({ state }) => (
                <div className="flex flex-wrap gap-1">
                  {state.values.length ? (
                    state.values.map((item) => (
                      <span key={item.value} className="text-sm text-gray-800">
                        {item.label}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm">+ search</span>
                  )}
                </div>
              )
            : undefined
        }
        dropdownRenderer={
          customDropdownRender
            ? ({ props, methods }) => (
                <div className="max-h-[300px] overflow-y-auto bg-white border rounded">
                  {props.options.map((option, index) => (
                    <div
                      key={index}
                      className="cursor-pointer px-2 py-1 hover:bg-teal-100"
                      onClick={() => methods.addItem(option)}
                    >
                      {option.custom || option.label}
                    </div>
                  ))}
                </div>
              )
            : undefined
        }
      />
      {touched?.[id] && errors?.[id] && (
        <p className="text-sm text-red-500 mt-1">{errors[id]}</p>
      )}
    </div>
  );
};

export const TextAreaControl = ({
  id = "",
  translate_key = "",
  label = "",
  value,
  onChange,
  onBlur,
  placeholder = "",
  error = false,
  className = "",
  inputClassName = "",
  touched,
  errors,
  rows = 4,
}) => {
  const displayLabel = ENABLE_TRANSLATION
    ? TranslationService.translate(translate_key, { defaultValue: label })
    : label;

  return (
    <div className={cn("mb-4 text-start", className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {displayLabel}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={cn(
          "w-full px-3 py-2 border rounded-lg focus:outline-none transition-colors",
          error
            ? "border-red-500 focus:ring-2 focus:ring-red-500"
            : "border-gray-300 focus:ring-2 focus:ring-teal-500",
          inputClassName
        )}
      ></textarea>
      {touched?.[id] && errors?.[id] && (
        <p className="text-sm text-red-500 mt-1">{errors[id]}</p>
      )}
    </div>
  );
};

export const CheckboxRadioControl = ({
  id,
  name,
  type = "checkbox",
  label,
  checked,
  onChange,
  onBlur,
  error,
  className = "",
}) => {
  const handleChange = (e) => {
    onChange({
      target: {
        name,
        value: type === "checkbox" ? e.target.checked : e.target.value,
      },
    });
  };

  return (
    <div className="flex items-center mb-2">
      <input
        id={id}
        name={name}
        type={type}
        checked={checked}
        onChange={handleChange}
        onBlur={onBlur}
        className={cn(
          "h-4 w-4 text-teal-600 border-gray-300 rounded",
          error && "border-red-500 ring-red-500",
          className
        )}
      />
      <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      {error && <p className="text-sm text-red-500 ml-2">{error}</p>}
    </div>
  );
};

export const FormButtonControl = ({
  id = "",
  type = "submit",
  translate_key = "",
  text = "Submit",
  onClick,
  isLoading = false,
  disabled = false,
  className = "",
  buttonClassName = "",
  loadText = "Loading...",
}) => {
  const displayText = ENABLE_TRANSLATION
    ? TranslationService.translate(translate_key, { defaultValue: text })
    : text;

  return (
    <button
      id={id}
      onClick={onClick}
      disabled={isLoading || disabled}
      type={type}
      className={cn(
        "w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4  flex items-center justify-center rounded-lg transition-colors",
        buttonClassName
      )}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4 mr-2 text-white"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      )}
      {isLoading ? loadText : displayText}
    </button>
  );
};

export const ImageInputControl = ({
  id = "",
  name = "",
  value,
  className = "",
  readOnly = false,
  disabled = false,
  setFieldValue,
  handleBlur,
  refprop
}) => {
  const handleSingleFileChange = (e, setValue, valueName, callback = null) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setValue(valueName, loadEvent.target.result);
        if (callback) {
          callback();
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={cn("mb-4 text-start", className)}>
      <input
        id={id}
        name={name}
        ref={refprop}
        readOnly={readOnly}
        disabled={disabled}
        className="hidden"
        type="file"
        accept="image/jpeg, image/png"
        multiple={false}
        onChange={(event) =>
          handleSingleFileChange(event, setFieldValue, name)
        }
        onBlur={handleBlur}
      />
    </div>
  );
};
