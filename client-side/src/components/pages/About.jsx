import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import "../CSS/About.css"
import qa from "../../assets/qa.png"

export default function AccordionDemo() {
  return (
    <>
    <section className="about">
    <span>
      <h1>Have Questions?</h1>
      <h4>All your queries will be answered here. Explore the FAQs below or Contact us! </h4>
    </span>
    <img src={qa} alt="help" />
    </section>

    <section className="about2">
    <Accordion>
  <h2>FAQs</h2>
  <AccordionItem value="item-1">
    <AccordionTrigger className="question">What is Feedback Finesse?</AccordionTrigger>
    <hr />
    <AccordionContent className="answer">
      Feedback Finesse is an online platform designed specifically for college hostel students to submit grievances and complaints easily. Our goal is to simplify the complaint filing process and improve communication with hostel authorities to enhance the overall hostel experience.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger className="question">How do I submit a complaint on Feedback Finesse?</AccordionTrigger>
    <hr />
    <AccordionContent className="answer">
      To submit a complaint, simply navigate to the Complaint Submission section on our homepage. Choose the type of complaint (maintenance, facilities, noise disturbance, etc.), provide a detailed description, and optionally upload supporting documents.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger className="question">Can I track the status of my complaints on Feedback Finesse?</AccordionTrigger>
    <hr />
    <AccordionContent className="answer">
      Yes, you can track the status of your complaints and receive notifications on updates. This helps you stay informed about the progress of your grievance.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-4">
    <AccordionTrigger className="question">What types of reviews can I leave on Feedback Finesse?</AccordionTrigger>
    <hr />
    <AccordionContent className="answer">
      You can leave reviews on various aspects of hostel life, such as food quality, cleanliness, staff behavior, and more. Your reviews contribute to an overall rating for each hostel, assisting future students in making informed decisions.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-5">
    <AccordionTrigger className="question">Do I need to register to use Feedback Finesse?</AccordionTrigger>
    <hr />
    <AccordionContent className="answer">
      Yes, you need to register and log in using your email and password to access the complaint submission and review features. This authentication process ensures authorized access and enhances security.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-6">
    <AccordionTrigger className="question">How does Feedback Finesse ensure the confidentiality of complaints?</AccordionTrigger>
    <hr />
    <AccordionContent className="answer">
      Feedback Finesse takes measures to maintain the confidentiality of complaints and ensures that only authorized personnel have access to sensitive information. Your privacy and security are our top priorities.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-7">
    <AccordionTrigger className="question">Is Feedback Finesse mobile-friendly?</AccordionTrigger>
    <hr />
    <AccordionContent className="answer">
      Yes, Feedback Finesse is designed to be responsive and accessible on various devices, including smartphones and tablets, for your convenience.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-8">
    <AccordionTrigger className="question">What if I encounter technical issues while using Feedback Finesse?</AccordionTrigger>
    <hr />
    <AccordionContent className="answer">
      If you experience any technical issues, you can contact our support team through the provided contact options. We are here to assist you and ensure a smooth experience on our platform.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-9">
    <AccordionTrigger className="question">Can I provide feedback or suggestions for improving Feedback Finesse?</AccordionTrigger>
    <hr />
    <AccordionContent className="answer">
      Absolutely! We welcome your feedback and suggestions to enhance our platform further. Your input helps us continually improve and meet the needs of our users.
    </AccordionContent>
  </AccordionItem>
  
</Accordion>

    </section>

    </>
  );
}
