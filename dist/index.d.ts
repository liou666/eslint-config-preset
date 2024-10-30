import { Linter, ESLint } from 'eslint';

interface LiouConfig {
    ts?: boolean;
    ignores?: string[];
    plugins?: ESLint.Plugin[];
    rules?: Linter.RulesRecord;
    react?: boolean;
    json?: boolean;
    markdown?: boolean;
}
declare function export_default(liou_config?: LiouConfig, ...rest: Linter.Config[]): Promise<Linter.Config<Linter.RulesRecord>[]>;

export { export_default as default };
