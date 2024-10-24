import { FormHelperText, Textarea } from "@mui/joy";
import { InputHTMLAttributes } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import { FieldError } from "react-hook-form";
import { InfoOutlined } from "@mui/icons-material";

interface TextFieldProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  register: any;
  fieldError: FieldError | undefined;
  fieldName: string;
  label: string;
}

function FTextarea({
  register,
  fieldError,
  fieldName,
  label,
  type,
  ...rest
}: TextFieldProps) {
  const valueAsNumber = type === "number";

  return (
    <FormControl sx={{ my: 1 }}>
      <FormLabel>{label}</FormLabel>
      <Textarea
        {...register(fieldName, { valueAsNumber })}
        error={Boolean(fieldError?.message)}
        {...rest}
        minRows={3}
        type={type}
      />
      {fieldError?.message && (
        <FormHelperText sx={{ color: "red" }}>
          <InfoOutlined color="error" />
          {fieldError.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default FTextarea