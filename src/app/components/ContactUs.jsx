"use client";
import React from "react";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ButtonArrow from "@/icons/ButtonArrow";
import TelegramIcon from "@/icons/TelegramIcon";
import Link from "next/link";

const ContactUs = ({ data }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required("This field is required"),
    email: Yup.string()
      .email("Please provide a valid email address")
      .required("This field is required"),
  });

  const initialValues = {
    name: "",
    email: "",
    telegram: "",
    message: "",
  };

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setStatus }
  ) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setTimeout(() => {
          setSubmitting(false);
          resetForm();
          setStatus({ success: true });
        }, 400);
      } else {
        setStatus({ success: false });
      }
    } catch (error) {
      //console.error(error);
      setStatus({ success: false });
      setSubmitting(false);
    }
  };

  return (
    <section className="contact-us" id="contacts">
      <div className="_container">
        <div className="contact-us__body">
          <div className="col-01">
            <Image
              alt="contact"
              src={"/images/contact.webp"}
              width={532}
              height={526}
            />
          </div>
          <div className="col-02">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                isSubmitting,
                status,
                resetForm,
                setFieldValue,
                setStatus,
                touched,
                errors,
              }) => (
                <div className="form-wrap">
                  <Form>
                    {!status && (
                      <>
                        <h2>{data.contact_title}</h2>
                        <p>{data.contact_subtitle}</p>
                        <div className="form-inner">
                          <div>
                            <Field
                              name="name"
                              type="text"
                              placeholder="Your Name"
                              className={
                                touched.name && errors.name ? "invalid" : ""
                              }
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="error"
                            />
                          </div>

                          <div>
                            <Field
                              name="email"
                              type="email"
                              placeholder="Your e-mail"
                              className={
                                touched.email && errors.email ? "invalid" : ""
                              }
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="error"
                            />
                          </div>

                          <div>
                            <Field
                              name="telegram"
                              type="text"
                              placeholder="Telegram"
                              className={
                                touched.telegram && errors.telegram
                                  ? "invalid"
                                  : ""
                              }
                            />
                            <ErrorMessage
                              name="telegram"
                              component="div"
                              className="error"
                            />
                          </div>

                          <div>
                            <Field
                              name="message"
                              type="text"
                              placeholder="Your Message"
                            />
                          </div>

                          <div className="buttons">
                            <button
                              type="submit"
                              className="green-button"
                              disabled={isSubmitting}
                            >
                              Send
                              <ButtonArrow />
                            </button>
                            {data.contact_link && (
                              <Link
                                href={data.contact_link}
                                className="outlined-button"
                              >
                                <TelegramIcon />
                                Contact support
                              </Link>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                    {isSubmitting && (
                      <div className="loading">
                        <img src="/images/loading.svg" />
                      </div>
                    )}
                    {status && status.success && (
                      <div className="success">
                        <h2>Your request has been successfully delivered</h2>
                        <p>
                          Thank you for reaching out! We’ll review your request
                          and get back to you shortly.
                        </p>
                        <div className="buttons">
                          <button
                            className="green-button"
                            onClick={() => {
                              resetForm(); // Reset the form
                              setStatus(null); // Clear the status
                            }}
                          >
                            Back
                          </button>
                          {data.contact_link && (
                            <Link
                              href={data.contact_link}
                              className="outlined-button"
                            >
                              <TelegramIcon />
                              Contact support
                            </Link>
                          )}
                        </div>
                      </div>
                    )}
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
