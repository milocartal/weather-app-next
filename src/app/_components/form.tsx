"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/app/_components/ui/form";
import { Input } from "~/app/_components/ui/input";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Fragment } from "react";

const AddCitySchema = z.object({
  name: z.string().min(1, { message: "Ce champ est requis" }),
});

interface AddCityProps {
  setCurrent: (city: string, reload?: boolean) => void;
}

export const AddCityForm: React.FC<AddCityProps> = ({ setCurrent }) => {
  async function onSubmit(values: z.infer<typeof AddCitySchema>) {
    try {
      const cities: string[] = JSON.parse(
        localStorage.getItem("cities") ?? "[]",
      ) as string[];
      if (!cities.includes(values.name)) {
        cities.push(values.name);
      }
      localStorage.setItem("cities", JSON.stringify(cities));

      setCurrent(values.name, true);
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue.");
    }
  }

  const form = useForm<z.infer<typeof AddCitySchema>>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(AddCitySchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-3/4">
              <FormControl>
                <Input placeholder="Nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-1/4 xl:w-auto"
        >
          {form.formState.isSubmitting ? (
            <Fragment>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>En cours...</span>
            </Fragment>
          ) : (
            "Ajouter"
          )}
        </Button>
      </form>
    </Form>
  );
};
