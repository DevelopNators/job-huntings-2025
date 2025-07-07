import React from "react";
import CreatableSelect from "react-select/creatable";

const CustomClearText = () => "clear all";

const ClearIndicator = (props) => {
  const {
    children = <CustomClearText />,
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div {...restInnerProps} ref={ref} style={getStyles("clearIndicator", props)}>
      <div style={{ padding: "0px 5px" }}>{children}</div>
    </div>
  );
};

const ClearIndicatorStyles = (base, state) => ({
  ...base,
  cursor: "pointer",
  color: state.isFocused ? "blue" : "black",
});

const TagComponent = ({
  id = "",
  label = "",
  labelClassName = "",
  className = "",
  inputClassName = "",
  options = [],
  handleChange,
  value,
  name,
  errors = null,
  touched = null,
}) => {
  const handleTagChange = (selectedOptions) => {
    const stringifiedValue = selectedOptions
      ? selectedOptions.map((option) => option.value).join(",")
      : "";
    handleChange(name, stringifiedValue);
  };

  const selectedTags = value
    ? value.split(",").map((val) => ({ label: val, value: val }))
    : [];

  const showError = touched?.[id] && errors?.[id];

  return (
    <div className={`mb-4 text-start ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <CreatableSelect
        name={name}
        inputId={id}
        closeMenuOnSelect={false}
        components={{ ClearIndicator }}
        styles={{
          clearIndicator: ClearIndicatorStyles,
          control: (base) => ({
            ...base,
            borderColor: showError ? "#f87171" : "#d1d5db", // red-400 or gray-300
            boxShadow: showError
              ? "0 0 0 1px #f87171"
              : "0 0 0 1px #14b8a6", // teal-500
            "&:hover": {
              borderColor: showError ? "#f87171" : "#14b8a6",
            },
          }),
        }}
        value={selectedTags}
        onChange={handleTagChange}
        isMulti
        options={options}
        placeholder="Type and press enter to add new tag"
        className={inputClassName}
      />
      {showError && <p className="text-sm text-red-500 mt-1">{errors[id]}</p>}
    </div>
  );
};

export default TagComponent;
