from posixpath import join


class ProofException(Exception):
    def __init__(self, issues):
        newline = '\n'
        self.message = f"\nflow is not flawless:\n{newline.join(str(issue) for issue in issues)}"
        super().__init__(self.message)
