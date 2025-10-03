import skills from '@/data/skills';

export function Skills() {
    return (
        <>
            <h2>Skills</h2>
            <ul>
                {skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                ))}
            </ul>
        </>
    );
}
