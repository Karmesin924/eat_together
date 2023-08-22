package SWST.eat_together.comment;

import SWST.eat_together.comment.model.CommentDTO;
import SWST.eat_together.comment.model.CommentDetailDTO;
import SWST.eat_together.member.Member;
import SWST.eat_together.post.Post;
import SWST.eat_together.post.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public void addComment(Member member, CommentDTO regiComment, Long postId) {
        Comment comment = new Comment();

        comment.setContents(regiComment.getContents());

        comment.setCreatedDate(LocalDateTime.now());
        comment.setUser(member);

        Optional<Post> postOptional = postRepository.findById(postId);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            comment.setPost(post);

            try {
                commentRepository.save(comment);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("Post with postId " + postId + " not found");
        }

        try {
            commentRepository.save(comment);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Integer deleteComment(Long commentId, String email) {
        Comment comment = commentRepository.getReferenceById(commentId);

        if(!email.equals(comment.getUser().getEmail()))
            return -1;
        commentRepository.delete(comment);

        return 0;
    }

    public Integer editComment(Long commentId, String email, String contents) {
        Comment comment = commentRepository.getReferenceById(commentId);

        if (!email.equals(comment.getUser().getEmail()))
            return -1;
        comment.setContents(contents);
        commentRepository.save(comment);
        return 0;
    }

    public List<CommentDetailDTO> getCommentDetailDTOs(String postId, String email) {
        List<Comment> comments = commentRepository.findByPostId(Long.parseLong(postId));
        return createCommentDetailDTOs(comments, email);
    }

    private List<CommentDetailDTO> createCommentDetailDTOs(List<Comment> comments, String email) {
        List<CommentDetailDTO> commentDetailDTOs = new ArrayList<>();

        for (Comment comment : comments) {
            CommentDetailDTO commentDetailDTO = new CommentDetailDTO();
            commentDetailDTO.setId(comment.getId());
            commentDetailDTO.setPostId(comment.getPost().getId());
            commentDetailDTO.setContents(comment.getContents());
            commentDetailDTO.setNickname(comment.getUser().getNickname());
            commentDetailDTO.setCreatedDate(comment.getCreatedDate());
            commentDetailDTO.setEmail(comment.getUser().getEmail());
            commentDetailDTO.setAuthor(comment.getUser().getEmail().equals(email));

            commentDetailDTOs.add(commentDetailDTO);
        }

        return commentDetailDTOs;
    }
}
