import { z } from 'zod'

export const RegisterSchema = z.object({
    email: z.string().min(1, { message: 'El correo electrónico es obligatorio' }).email({ message: 'El correo electrónico no es válido' }),
    name: z.string().min(2, { message: 'El nombre es obligatorio' }),
    lastName: z.string().min(2, { message: 'El apellido es obligatorio' }),
    password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    password_confirmation: z.string()
}).refine(data => data.password === data.password_confirmation, {
    message: 'Las contraseñas no coinciden',
    path: ['password_confirmation']
})

export const TokenSchema = z.string({ message: 'Token no válido' }).length(6, { message: 'Token no válido' })

export const ForgotPasswordSchema = z.object({
    email: z.string()   
            .min(1, {message: 'El correo electrónico es obligatorio'})
            .email( {message: 'Correo electrónico no válido'}),
})

export const LoginSchema = z.object({
    email: z.string()
        .min(1, { message: 'El correo electrónico es obligatorio' })
        .email({ message: 'Correo electrónico no válido' }),
    password: z.string()
        .min(1, { message: 'La contraseña es obligatoria' })
})

export const SuccessSchema = z.object({
    success: z.boolean(),
    message: z.string()
})

export const ErrorResponseSchema = z.object({
    success: z.boolean(),
    message: z.string()
})

export const UserSchema = z.object({
    _id: z.string(),
    name: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    photo: z.string()
})

export const UserAPIResponseSchema = z.object({
    success: z.boolean(),
    user: UserSchema
})

export const ExpenseSchema = z.object({
    _id: z.string(),
    name: z.string(),
    amount: z.number(),
    budget: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
})


export const ResetPasswordSchema = z.object({
    password: z.string()
            .min(8, {message: 'La contraseña debe ser de al menos 8 caracteres'}),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no son iguales",
    path: ["password_confirmation"]
});

export const DraftBudgetSchema = z.object({
    name: z.string()
            .min(1, {message: 'El nombre del presupuesto es obligatorio'}),
    amount: z.coerce.
            number({message: 'Cantidad no válida'})
            .min(1, {message: 'Cantidad no válida'}),
})
// TODO
export const DraftExpenseSchema = z.object({
    name: z.string()
            .min(1, {message: 'El nombre del gasto es obligatorio'}),
    amount: z.coerce.
            number({message: 'Cantidad no válida'})
            .min(1, {message: 'Cantidad no válida'}),
})

export const PasswordValidationSchema = z.string().min(1, { message: 'La contraseña es obligatoria' })

export const BudgetAPIResponseSchema = z.object({
    _id: z.string(),
    name: z.string(),
    amount: z.number(),
    expenses: z.array(ExpenseSchema),
    userId: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
})

export const BudgetsAPIResponseSchema = z.object({
    success: z.boolean(),
    budgets: z.array(BudgetAPIResponseSchema.omit({expenses: true}))
})

export const BudgetById = z.object({
    success: z.boolean(),
    budget: BudgetAPIResponseSchema
})

export const ExpenseById = z.object({
    success: z.boolean(),
    expense: ExpenseSchema
})

export const ProfileFormSchema = z.object({
    name: z.string()
            .min(1, {message: 'Tu nombre es obligatorio'}),
    lastName: z.string()
            .min(1, {message: 'Tu apellido es obligatorio'}),
    email: z.string()
            .min(1, {message: 'El correo electrónico es obligatorio'})
            .email({message: 'Correo electrónico no válido'}),
})

export const UpdatePasswordSchema = z.object({
    current_password: z.string().min(1, { message: 'La contraseña es obligatorio' }),
    password: z.string().min(0, { message: 'La nueva contraseña debe ser de al menos 8 caracteres' }),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: 'Las contraseñas no son iguales',
    path: ["password_confirmation"]
})

export type User = z.infer<typeof UserSchema>
export type Budget = z.infer<typeof BudgetAPIResponseSchema>
export type GetExpenseById = z.infer<typeof ExpenseById>
export type Expense = z.infer<typeof ExpenseSchema>
