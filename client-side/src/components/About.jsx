import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionDemo() {
  return (
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Feedback Finesse ?</AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis a
          beatae aut et culpa? Voluptas, quia eligendi!
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What is Feedback Finesse ?</AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis a
          beatae aut et culpa? Voluptas, quia eligendi!
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What is Feedback Finesse ?</AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis a
          beatae aut et culpa? Voluptas, quia eligendi!
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
