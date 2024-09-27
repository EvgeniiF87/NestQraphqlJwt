import dataSource from 'src/config/data-source.options';

const query = (id: number) => {
  return `
    SELECT (SUM(r.stars) / COUNT(r."userId")) AS ratings FROM events AS e
    LEFT JOIN rating AS r ON r."eventId" = e."id"
    WHERE e.id = ${id}
  `;
};

export const getRating = async (id: number): Promise<number> => {
  return await dataSource.query(query(id));
};
