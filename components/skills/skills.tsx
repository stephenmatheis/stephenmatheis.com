import skills from '@/data/skills';

export function Skills() {
    return (
        <ul>
            {skills.map((skill) => (
                <li key={skill}>{skill}</li>
            ))}
        </ul>
    );
}
