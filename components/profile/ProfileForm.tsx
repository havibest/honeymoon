"use client";

import { useState } from "react";
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileFormData } from "@/lib/validators/profile";
import { LANGUAGES } from "@/constants/languages";
import { GENDERS } from "@/constants/genders";
import { INTERESTS } from "@/constants/interests";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

interface ProfileFormProps {
  onSubmit: SubmitHandler<ProfileFormData>;
  loading: boolean;
}

export default function ProfileForm({ onSubmit, loading }: ProfileFormProps) {
  const [bioText, setBioText] = useState("");
    const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema) as Resolver<ProfileFormData>,
    defaultValues: { speaks: [], learning: [] },
  });


  const speaksValues = watch("speaks") || [];
  const learningValues = watch("learning") || [];

  const handleCheckboxChange = (field: "speaks" | "learning", lang: string, checked: boolean) => {
    const currentValues = field === "speaks" ? speaksValues : learningValues;
    const updatedValues = checked 
      ? [...currentValues, lang] 
      : currentValues.filter((v) => v !== lang);
    setValue(field, updatedValues, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Basic Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input label="Age" type="number" error={errors.age?.message} {...register("age")} />
        <Select label="Gender" options={GENDERS} error={errors.gender?.message} {...register("gender")} />
        <Input label="City" type="text" error={errors.city?.message} {...register("city")} />
      </div>

      <h2 className="text-xl font-bold text-gray-900 border-b pb-2">About Me</h2>
      <div className="space-y-2">
        <label className="text-sm font-medium block">Bio (Max 300 characters)</label>
        <textarea
          className="w-full min-h-[100px] p-3 rounded-xl border border-gray-300 outline-none focus:border-rose-500 transition"
          {...register("bio")}
          maxLength={300}
          onChange={(e) => {
            setBioText(e.target.value);
            register("bio").onChange(e);
          }}
        />
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{errors.bio?.message && <span className="text-red-500">{errors.bio.message}</span>}</span>
          <span>{bioText.length} / 300</span>
        </div>
      </div>

      <Select label="Interested In" options={INTERESTS} error={errors.interestedIn?.message} {...register("interestedIn")} />

      <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Languages I Speak</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {LANGUAGES.map((lang) => (
          <label key={`speaks-${lang}`} className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="checkbox"
              checked={speaksValues.includes(lang)}
              onChange={(e) => handleCheckboxChange("speaks", lang, e.target.checked)}
            />
            {lang}
          </label>
        ))}
      </div>
      {errors.speaks && <p className="text-sm text-red-500">{errors.speaks.message}</p>}

      <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Languages I'm Learning</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {LANGUAGES.map((lang) => (
          <label key={`learning-${lang}`} className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="checkbox"
              checked={learningValues.includes(lang)}
              onChange={(e) => handleCheckboxChange("learning", lang, e.target.checked)}
            />
            {lang}
          </label>
        ))}
      </div>
      {errors.learning && <p className="text-sm text-red-500">{errors.learning.message}</p>}

      <Button type="submit" loading={loading}>Complete Profile</Button>
    </form>
  );
}
