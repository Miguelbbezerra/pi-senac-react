import React from "react";
import { IMaskInput } from "react-imask";

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

// Máscara de CPF
export const CPFMaskInput = React.forwardRef<HTMLInputElement, CustomProps>(
    function CPFMaskInput(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="000.000.000-00"
                definitions={{
                    '0': /[0-9]/,
                }}
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

// Máscara de Telefone
export const PhoneMaskInput = React.forwardRef<HTMLInputElement, CustomProps>(
    function PhoneMaskInput(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="(00) 00000-0000"
                definitions={{
                    '0': /[0-9]/,
                }}
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

// Máscara de CEP
export const CEPMaskInput = React.forwardRef<HTMLInputElement, CustomProps>(
    function CEPMaskInput(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="00000-000"
                definitions={{
                    '0': /[0-9]/,
                }}
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

// Máscara para apenas letras
export const GeneroMaskInput = React.forwardRef<HTMLInputElement, CustomProps>(
    function GeneroMaskInput(props, ref) {
        const { onChange, ...other } = props;

        const handleAccept = (value: string) => {
            const formattedValue = value.replace(/\b\w+/g, (word) => {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            });
            onChange({ target: { name: props.name, value: formattedValue } });
        };
        return (
            <IMaskInput
                {...other}
                mask={/^[A-Za-z]*$/}
                definitions={{
                    'A': /[A-Za-z]/,
                }}
                inputRef={ref}
                onAccept={handleAccept}
                overwrite
            />
        );
    },
);

<<<<<<< HEAD
// Máscara para apenas letras
export const PasswordMaskInput = React.forwardRef<HTMLInputElement, CustomProps>(
    function PasswordMaskInput(props, ref) {
        const { onChange, ...other } = props;

        const handleAccept = (value: string) => {
            // Remove espaços da entrada
            const sanitizedValue = value.replace(/\s+/g, '');
            onChange({ target: { name: props.name, value: sanitizedValue } });
        };
        return (
            <IMaskInput
                {...other}
                mask={/.*/}
                inputRef={ref}
                onAccept={handleAccept}
                overwrite
            />
        );
    },
);

=======
>>>>>>> refactor-login
// Máscara para apenas letras e espaços
export const LettersMaskInput = React.forwardRef<HTMLInputElement, CustomProps>(
    function LettersMaskInput(props, ref) {
        const { onChange, ...other } = props;

        const handleAccept = (value: string) => {
            const formattedValue = value.replace(/\b\w+/g, (word) => {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            });
            onChange({ target: { name: props.name, value: formattedValue } });
        };

        return (
            <IMaskInput
                {...other}
                mask={/^[A-Za-z\s]*$/}
                definitions={{
                    'A': /[A-Za-z\s]/,
                }}
                inputRef={ref}
                onAccept={handleAccept}
                overwrite
            />
        );
    },
);

// Máscara para apenas números
export const NumbersMaskInput = React.forwardRef<HTMLInputElement, CustomProps>(
    function NumbersMaskInput(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="0000000000"
                definitions={{
                    '0': /[0-9]/,
                }}
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);
