import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type LinkListProps = {
  links: Link[];
};
type Link = { category: string; url: string; name: string };
export default function LinkList({ links }: Readonly<LinkListProps>) {
  const categories = links.reduce(
    (acc: { category: string; links: Link[] }[], link) => {
      const category = acc.find((cat) => cat.category === link.category);
      if (category) {
        category.links.push(link);
      } else {
        acc.push({ category: link.category, links: [link] });
      }
      return acc;
    },
    [],
  ).sort((a, b) => b.category.localeCompare(a.category));

  return (
    <Accordion type="single" collapsible className="w-full" defaultValue={`item-${categories[0].category}`}>
      {categories.map((category) => {
        return (
          <AccordionItem key={category.category} value={`item-${category.category}`}>
            <AccordionTrigger>{category.category}</AccordionTrigger>
            <AccordionContent>
              {category.links.map((link) => {
                return (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
