import {describe, expect, it, vi} from "vitest";
import {render, fireEvent} from "@testing-library/react";
import TextField from "@/components/TextField";

describe("TextField", () => {
	const label = "Username";
	const name = "username";
	const type = "text";

	it("renders text field with label, name, and type", () => {
		const {getByLabelText} = render(
			<TextField label={label} InputProps={{name, type}} />
		);
		const textField = getByLabelText(label);

		expect(textField).toBeInTheDocument();
		expect(textField).toHaveAttribute("name", name);
		expect(textField).toHaveAttribute("type", type);
	});

	it("renders text field with custom className", () => {
		const {container} = render(
			<TextField
				label={label}
				InputProps={{name, type}}
				className="custom-class"
			/>
		);
		const textField = container.firstChild;

		expect(textField).toHaveClass("custom-class");
	});

	it("calls onChange handler when input value changes", () => {
		const value = "JohnDoe";

		const handleChange = vi.fn();
		const {getByLabelText} = render(
			<TextField
				label={label}
				InputProps={{name, type, onChange: handleChange}}
			/>
		);
		const textField = getByLabelText(label);

		fireEvent.change(textField, {target: {value}});
		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(textField).toHaveValue(value);
	});
});
